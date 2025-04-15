export function getHomepage(req, res) {
    res.render("pages/index", {
      title: "Welcome to IkoConnect",
      description: "Your go-to platform for everything freelance.",
      originalUrl: req.originalUrl,
    });
  }
  
  export function getAboutPage(req, res) {
    res.render("pages/about", {
      title: "About Us | IkoConnect",
      description: "Learn more about IkoConnect and our mission.",
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
      blogPosts,
    });
  }
  
  export function getResourcesPage(req, res) {
    const tools = [
      { name: "Notion", link: "https://notion.so" },
      { name: "Trello", link: "https://trello.com" },
      { name: "Fiverr", link: "https://fiverr.com" },
      { name: "Slack", link: "https://slack.com" },
    ];
  
    res.render("pages/resources", {
      title: "Resources | IkoConnect",
      description: "Tools and guides for freelancers.",
      tools, // 👈 ова го праќа во EJS
    });
  }
  
  
  
  export function getJobsPage(req, res) {
    res.render("pages/jobs", {
      title: "Job Board | IkoConnect",
      description: "Find your next freelance gig.",
    });
  }
  