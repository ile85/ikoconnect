// controllers/resourceController.js
const tools = [
    { name: "Fiverr", link: "https://www.fiverr.com/" },
    { name: "Upwork", link: "https://www.upwork.com/" },
    { name: "ClickUp", link: "https://www.clickup.com/" },
    { name: "Notion", link: "https://www.notion.so/" },
    { name: "Grammarly", link: "https://www.grammarly.com/" },
    { name: "NordVPN", link: "https://nordvpn.com/" }
  ];
  
  export function renderResourcesPage(req, res) {
    res.render("pages/resources", { tools });
  }
  
  