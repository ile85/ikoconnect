module.exports = {
    getHomepage: (req, res) => {
        console.log("✅ getHomepage function called!"); // Debugging log
        res.render('pages/resources', {
            title: 'Resources | IkoConnect',
            description: 'Explore valuable resources, tools, and guides for freelancers.',
        });
    }
};
