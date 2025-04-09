import express from "express";
const router = express.Router();

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

router.get("/", (req, res) => {
  res.render("pages/blog", { posts });
});
export default router;