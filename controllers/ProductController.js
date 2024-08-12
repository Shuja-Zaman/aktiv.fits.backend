const Product = require('../models/Product');
const {bucket} = require('../config/firebase');


exports.createProduct = async (req, res) => {
  try {
    const file = req.file;
    const { name, price, description, category_id, sizes } = req.body;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Create a unique filename
    const fileName = `images/${Date.now()}_${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    // Upload file to Firebase Storage
    const fileUploadStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });

    fileUploadStream.on('error', (err) => {
      console.error('Error uploading file:', err);
      return res.status(500).json({ message: 'Error uploading file' });
    });

    fileUploadStream.on('finish', async () => {
      try {
        // Get the download URL
        const [fileUrl] = await fileUpload.getSignedUrl({
          action: 'read',
          expires: '03-09-2491' // Set an expiration date for the URL
        });

        // Create the new product with the image URL
         // Ensure sizes is an array
         const sizesArray = JSON.parse(sizes) || [];

         // Create the new product with the image URL and sizes
         const newProduct = new Product({
           name,
           price,
           description,
           imgurl: fileUrl,
           category_id,
           sizes: sizesArray // Include sizes here
         });
        const product = await newProduct.save();

        res.status(201).json(product);
      } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: error.message });
      }
    });

    fileUploadStream.end(file.buffer);

  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all products with optional category and name filter
exports.getProducts = async (req, res) => {
  try {
    const query = {};
    if (req.query.category_id) {
      query.category_id = req.query.category_id;
    }
    if (req.query.name) {
      query.name = new RegExp(req.query.name, 'i'); // Case-insensitive regex search
    }
    const products = await Product.find(query).populate('category_id');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category_id');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
