const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set static folder for public assets (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Define Routes
app.get('/', (req, res) => {
    res.render('index');  // This will render views/index.ejs
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



app.get('/about', (req, res) => {
    res.render('about'); // Renders views/about.ejs
});

app.get('/blog', (req, res) => {
    res.render('blog'); // Renders views/blog.ejs
});

app.get('/resources', (req, res) => {
    res.render('resources'); // Renders views/resources.ejs
});

app.get('/jobs', (req, res) => {
    res.render('jobs'); // Renders views/jobs.ejs
});

