// controllers/signupController.js

// GET: Render Sign Up Form
export function renderSignupForm(req, res) {
    res.render("pages/signup");
  }
  
  // POST: Handle Form Submission
  export function handleSignup(req, res) {
    const { name, email } = req.body;
  
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required." });
    }
  
    console.log(`📝 New signup: ${name} (${email})`);
  
    // In future: Save to database or send to Mailchimp
  
    return res.status(200).json({ message: "Signup received! ✅" });
  }
  