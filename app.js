// Import required modules
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Database connection (if using MongoDB)

// Load environment variables
dotenv.config();

// Connect to database (if applicable)
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON data
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const indexRoutes = require('./routes/index');
const blogRoutes = require('./routes/blog');
const jobRoutes = require('./routes/jobs');

// Use Routes
app.use('/', indexRoutes);
app.use('/blog', blogRoutes);
app.use('/jobs', jobRoutes);

// Error Handling Middleware
app.use((req, res, next) => {
    res.status(404).render('pages/404', { title: 'Page Not Found' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
