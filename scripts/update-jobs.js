// scripts/update-jobs.js (safe fallback loader)
const fs = require("fs");
const path = require("path");

async function updateJobs() {
  const outputPath = path.join(__dirname, "..", "data", "jobs.json");

  const mockJobs = [
    {
      id: "frontend-react-dev",
      title: "React Frontend Developer",
      company_name: "CodeCrew",
      category: "Software Development",
      candidate_required_location: "Remote",
      job_type: "Contract",
      url: "https://example.com/jobs/frontend-react-dev",
      publication_date: new Date().toISOString(),
      company_logo: "/images/logos/codecrew.png",
      salary: "$4000–6000/month",
      description: "<p>Work on exciting React projects in a global team.</p>"
    },
    {
      id: "remote-ux-designer",
      title: "UX Designer (Remote)",
      company_name: "UX Studio",
      category: "Design",
      candidate_required_location: "Worldwide",
      job_type: "Full-time",
      url: "https://example.com/jobs/remote-ux-designer",
      publication_date: new Date().toISOString(),
      company_logo: "/images/logos/uxstudio.png",
      salary: "$3000–4500",
      description: "<p>Design user-centric experiences across web & mobile apps.</p>"
    }
  ];

  fs.writeFileSync(outputPath, JSON.stringify(mockJobs, null, 2));
  console.log(`✅ Saved ${mockJobs.length} fallback jobs to data/jobs.json`);
}

updateJobs();
