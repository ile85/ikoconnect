exports.getHomepage = (req, res) => {
    res.render('pages/index', { title: 'Welcome to IkoConnect' });
};
