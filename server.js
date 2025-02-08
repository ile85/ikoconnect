const express = require('express');
const path = require('path');

const app = express();

// Middleware for parsing JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ✅ Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ✅ Load routes
const indexRoutes = require('./routes/index');  // Ensure this path is correct
const blogRoutes = require('./routes/blog');  // Add this for /blog
const resourceRoutes = require('./routes/resources'); // Add this for /resources
const jobsRoutes = require('./routes/jobs'); // Add this for /jobs
const aboutRoutes = require('./routes/about'); // Add this for /about

app.use('/', indexRoutes);
app.use('/blog', blogRoutes);
app.use('/resources', resourceRoutes);
app.use('/jobs', jobsRoutes);
app.use('/about', aboutRoutes);

// ✅ Start server on PORT 5500
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
