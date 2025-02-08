const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/about', {
        title: 'About Us | IkoConnect',
        description: 'Learn more about IkoConnect and our mission for freelancers.',
    });
});

module.exports = router;
