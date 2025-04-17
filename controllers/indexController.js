import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getHomepage(req, res) {
  res.render("pages/index", {
    title: "Welcome to IkoConnect",
    description: "Your go-to platform for everything freelance.",
    originalUrl: req.originalUrl,
  });
}



export function getBlogPage(req, res) {
  const blogPosts = [
    {
      title: "5 Productivity Hacks for Freelancers",
      slug: "productivity-hacks",
      summary:
        "Boost your freelance career with these powerful productivity hacks.",
    },
    {
      title: "Best Tools for Remote Work in 2024",
      slug: "best-tools-remote-work",
      summary:
        "Discover the best tools to make remote work easier and more efficient.",
    },
    {
      title: "How to Get Clients on Upwork & Fiverr",
      slug: "get-clients-upwork-fiverr",
      summary: "Learn the secrets to finding high-paying freelance clients.",
    },
  ];

  res.render("pages/blog", {
    title: "Blog | IkoConnect",
    description: "Insights and tips for freelancers.",
    posts: blogPosts, 
  });
}

export function getJobsPage(req, res) {
  const jobs = [
    {
      title: "Remote Frontend Developer",
      company: "TechNova Inc.",
      location: "Remote - Europe",
      link: "#"
    },
    {
      title: "Freelance Graphic Designer",
      company: "Creative Minds",
      location: "Remote - Worldwide",
      link: "#"
    },
    {
      title: "Content Writer (Part-time)",
      company: "WriteHub",
      location: "Remote - US",
      link: "#"
    }
  ];

  res.render("pages/jobs", {
    title: "Job Board | IkoConnect",
    description: "Find your next freelance gig.",
    jobs,
  });
}


