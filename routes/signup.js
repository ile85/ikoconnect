const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/signup', { 
        title: "Sign Up - IkoConnect",
        description: "Join IkoConnect and start your freelance journey today!"
    });
});

router.post('/', (req, res) => {
    const { name, email, password } = req.body;
    console.log(`📩 New Signup: Name - ${name}, Email - ${email}`);

    // ✅ Render a confirmation page with a styled message
    res.render('pages/signup-success', { 
        title: "Signup Successful",
        description: "Welcome to IkoConnect!",
        name
    });
});

module.exports = router;
