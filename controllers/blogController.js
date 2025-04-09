// controllers/blogController.js
const posts = [
    {
      title: "Welcome to IkoConnect Blog!",
      content: "Here you'll find tips, tutorials, and inspiration for your freelancing and remote work journey."
    },
    {
      title: "Top 5 Freelance Platforms in 2025",
      content: "Explore the best websites for getting freelance gigs this year, including Upwork, Fiverr, and more."
    }
  ];
  
  export function renderBlogPage(req, res) {
    res.render("pages/blog", { posts });
  }
  