const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/blog', {
        title: 'Blog | IkoConnect',
        description: 'Latest articles and insights on freelancing and remote work.',
    });
});

module.exports = router;