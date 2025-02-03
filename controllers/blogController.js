const blogs = [
    { id: 1, title: 'How to Start Freelancing', content: 'Lorem ipsum...' },
    { id: 2, title: 'Best Tools for Remote Work', content: 'Lorem ipsum...' }
];

exports.getAllBlogs = (req, res) => {
    res.render('pages/blog', { title: 'Blog', blogs });
};

exports.getBlogById = (req, res) => {
    const blog = blogs.find(b => b.id == req.params.id);
    if (!blog) return res.status(404).render('404', { title: 'Page Not Found' });
    res.render('pages/blogPost', { title: blog.title, blog });
};
