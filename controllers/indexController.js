exports.getHomepage = (req, res) => {
    res.render('pages/index', { 
        title: 'IkoConnect | Empower Your Freelance Career',
        description: 'Your ultimate freelance resource for job listings, tools, and tips.'
    });
};
