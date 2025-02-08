export function getHomepage (req, res) {
    res.render('pages/home', {
        title: 'Welcome to IkoConnect',
        description: 'Your go-to platform for everything freelance.',
    });
}

export function getAboutPage (req, res) {
    res.render('pages/about', {
        title: 'About Us | IkoConnect',
        description: 'Learn more about IkoConnect and our mission.',
    });
}

export function getBlogPage (req, res) {
    res.render('pages/blog', {
        title: 'Blog | IkoConnect',
        description: 'Insights and tips for freelancers.',
    });
}

export function getResourcesPage (req, res) {
    res.render('pages/resources', {
        title: 'Resources | IkoConnect',
        description: 'Tools and guides for freelancers.',
    });
}

export function getJobsPage (req, res) {
    res.render('pages/jobs', {
        title: 'Job Board | IkoConnect',
        description: 'Find your next freelance gig.',
    });
}