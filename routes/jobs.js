const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/jobs', {
        title: 'Jobs | IkoConnect',
        description: 'Find the best freelancing jobs and opportunities online.',
    });
});

module.exports = router;
