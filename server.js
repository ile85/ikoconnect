// ✅ Import Dependencies at the Top
const express = require('express');
const cors = require('cors'); // ✅ Must be declared BEFORE using it
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const signupRoutes = require('./routes/signup');
require('dotenv').config(); // ✅ Load environment variables early

// ✅ Initialize Express
const app = express();

// ✅ Middleware Setup (Order is Important)
app.use(cors());  // Must be used AFTER being imported
app.use(helmet());
app.use(morgan('dev'));

// ✅ Use Built-in Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve Static Files
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Set View Engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ✅ Database Connection (Before Routes)
const connectDB = require('./config/db');
connectDB();

// ✅ Load Routes AFTER Middleware
const indexRoutes = require('./routes/index');
const blogRoutes = require('./routes/blog');
const resourceRoutes = require('./routes/resources');
const jobsRoutes = require('./routes/jobs');
const aboutRoutes = require('./routes/about');

app.use('/signup', signupRoutes);
app.use('/', indexRoutes);
app.use('/resources', resourceRoutes);
app.use('/jobs', jobsRoutes);
app.use('/about', aboutRoutes);

// ✅ Fix Favicon Route
app.get('/favicon.ico', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public', 'images', 'favicon.ico'));
});

// ✅ Handle `/subscribe` Route
app.post('/subscribe', (req, res) => {
    const email = req.body.email;
    console.log(`📩 New subscription from: ${email}`);
    res.status(200).json({ message: "✅ Thank you for subscribing!" });
});

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("❌ Error:", err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
