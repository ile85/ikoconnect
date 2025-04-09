const express = require('express');
const router = express.Router();

// ✅ Blog Posts Data (Replace with DB later)
const blogPosts = [
    { title: "5 Productivity Hacks for Freelancers", slug: "productivity-hacks", summary: "Boost your freelance career with these powerful productivity hacks." },
    { title: "Best Tools for Remote Work in 2024", slug: "best-tools-remote-work", summary: "Discover the best tools to make remote work easier and more efficient." },
    { title: "How to Get Clients on Upwork & Fiverr", slug: "get-clients-upwork-fiverr", summary: "Learn the secrets to finding high-paying freelance clients." }
];

// ✅ Blog Home Page Route
router.get('/', (req, res) => {
    try {
        res.render('pages/blog', {
            title: 'Blog | IkoConnect',
            description: 'Latest articles and insights on freelancing and remote work.',
            blogPosts: blogPosts  // ✅ Make sure this is sent correctly
        });
    } catch (error) {
        console.error("❌ Blog Route Error:", error.message);
        res.status(500).json({ message: "Something went wrong!" });
    }
});

module.exports = router;
