// controllers/aboutController.js
export function renderAboutPage(req, res) {
    const aboutInfo = {
      title: "About IkoConnect",
      description: "IkoConnect is your go-to hub for remote work strategies, freelancing tools, and productivity hacks. Created by Ile Dimeski to empower remote workers and freelancers across the globe."
    };
  
    res.render("pages/about", { aboutInfo });
  }
  