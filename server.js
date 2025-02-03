const express = require('express');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder for public assets
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Import Routes
const indexRoutes = require('./routes/index');
const blogRoutes = require('./routes/blog');

app.use('/', indexRoutes);
app.use('/blog', blogRoutes);

// Error Handling Middleware (Handles 404)
app.use((req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
