const Category = require('../models/Category');

// create a category
exports.createCategory = async (req,res) => {
    try {
        const newCategory = new Category(req.body);
        const category = await newCategory.save();
        res.status(201).json(category);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}

// get all category
exports.getAllCategories = async (req,res) => {
    try {
        const categories = await Category.find();
        res.status(201).json(categories);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}

// get single category
exports.getSingleCategory = async (req,res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
          }
        res.status(201).json(category);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}

// delete category
exports.deleteCategory = async (req,res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
          }
          res.status(200).json({ message: 'Category deleted successfully' });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}

// update category
exports.updateCategory = async (req,res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body,{ new: true, runValidators: true });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
          }
          res.status(200).json(category);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}

