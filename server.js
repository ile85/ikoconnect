const express = require('express');
const path = require('path');

const app = express();

// ✅ Ensure the app only listens on port 5500
const PORT = 5500; 

// ✅ Built-in body parser (No need for `body-parser`)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// ✅ Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ✅ Load Routes
const indexRoutes = require('./routes/index');
const blogRoutes = require('./routes/blog');
const resourceRoutes = require('./routes/resources');
const jobsRoutes = require('./routes/jobs');
const aboutRoutes = require('./routes/about');

app.use('/', indexRoutes);
app.use('/blog', blogRoutes);
app.use('/resources', resourceRoutes);
app.use('/jobs', jobsRoutes);
app.use('/about', aboutRoutes);

// ✅ Handle `/subscribe` Route
app.post('/subscribe', (req, res) => {
    const email = req.body.email;
    console.log(`📩 New subscription from: ${email}`);
    res.send("✅ Thank you for subscribing!");
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
