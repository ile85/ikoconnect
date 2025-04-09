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
    const blogPosts = [
        { title: "5 Productivity Hacks for Freelancers", slug: "productivity-hacks", summary: "Boost your freelance career with these powerful productivity hacks." },
        { title: "Best Tools for Remote Work in 2024", slug: "best-tools-remote-work", summary: "Discover the best tools to make remote work easier and more efficient." },
        { title: "How to Get Clients on Upwork & Fiverr", slug: "get-clients-upwork-fiverr", summary: "Learn the secrets to finding high-paying freelance clients." }
    ];

    res.render('pages/blog', {
        title: 'Blog | IkoConnect',
        description: 'Insights and tips for freelancers.',
        blogPosts: blogPosts  // ✅ Now blogPosts is passed!
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
