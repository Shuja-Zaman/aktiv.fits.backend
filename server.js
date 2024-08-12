const express = require('express');
const mongodb = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors'); 
const errorHandler = require('./middleware/errorMiddleware');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const reviewRoutes = require('./routes/ReviewRoutes');
const verifyRoute = require('./routes/verifyRoute');
const adminRoutes = require('./routes/AdminRoutes');
const categoryRoutes = require('./routes/CategoryRoutes');
const productRoutes = require('./routes/ProductRoutes');
const userRoutes = require('./routes/UserRoutes');
const cartRoutes = require('./routes/CartRoutes');
const contactRoutes = require('./routes/MessageRoute');
const orderRoutes = require('./routes/OrderRoutes');

dotenv.config();

const app = express();

// Middleware
const corsOptions = {
  origin: 'http://localhost:5173', // Your frontend's URL
  credentials: true, // Allow credentials
};

app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON bodies
app.use(errorHandler); // Error handling middleware
app.use(cookieParser());

const secretkey = process.env.SECRET_KEY

// Middleware
app.use(express.json());
app.use(session({
  secret: secretkey,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false,
    maxAge:3600000
  } // Set to true if using HTTPS
}));

// Use Routes
app.use('/api/admin', adminRoutes); // Admin routes
app.use('/api/categories', categoryRoutes); // Category routes
app.use('/api/products', productRoutes); // Product routes
app.use('/api/users', userRoutes); // User routes
app.use('/api/verify', verifyRoute);
app.use('/api/cart', cartRoutes);
app.use('/api', contactRoutes); // send messages
app.use('/api', orderRoutes);
app.use('/api/reviews', reviewRoutes);


// Connect to MongoDB
mongodb();

const PORT = process.env.PORT || 3000;

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
