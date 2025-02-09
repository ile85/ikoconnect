const getHomepage = (req, res) => {
    res.render('pages/index', {
        title: 'Welcome to IkoConnect',
        description: 'Your go-to platform for everything freelance.',
    });
};

const getAboutPage = (req, res) => {
    res.render('pages/about', {
        title: 'About Us | IkoConnect',
        description: 'Learn more about IkoConnect and our mission.',
    });
};

const getBlogPage = (req, res) => {
    res.render('pages/blog', {
        title: 'Blog | IkoConnect',
        description: 'Insights and tips for freelancers.',
    });
};

const getResourcesPage = (req, res) => {
    res.render('pages/resources', {
        title: 'Resources | IkoConnect',
        description: 'Tools and guides for freelancers.',
    });
};

const getJobsPage = (req, res) => {
    res.render('pages/jobs', {
        title: 'Job Board | IkoConnect',
        description: 'Find your next freelance gig.',
    });
};

// ✅ Export the functions correctly
module.exports = {
    getHomepage,
    getAboutPage,
    getBlogPage,
    getResourcesPage,
    getJobsPage,
};
