// controllers/jobController.js
const jobs = [
    {
      title: "Remote Frontend Developer",
      company: "Tech Solutions GmbH",
      location: "Remote",
      link: "https://example.com/job/frontend-dev"
    },
    {
      title: "Virtual Assistant",
      company: "RemoteTasks",
      location: "Germany / Remote",
      link: "https://example.com/job/va-remote"
    },
    {
      title: "Freelance Graphic Designer",
      company: "DesignX",
      location: "Cologne",
      link: "https://example.com/job/graphic-designer"
    }
  ];
  
  export function renderJobsPage(req, res) {
    res.render("pages/jobs", { jobs });
  }
  