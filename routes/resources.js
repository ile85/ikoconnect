const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/resources', {
        title: 'Resources | IkoConnect',
        description: 'Explore valuable tools and resources for freelancers.',
    });
});

module.exports = router;
