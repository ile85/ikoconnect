const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController'); // ✅ Load the Controller

console.log("🔹 indexController:", indexController); // Debugging log

// ✅ Ensure the functions exist before using them
if (indexController && typeof indexController.getHomepage === 'function') {
    console.log("✅ getHomepage function found, attaching to route!");
    router.get('/', indexController.getHomepage);
    router.get('/about', indexController.getAboutPage);
    router.get('/blog', indexController.getBlogPage);
    router.get('/resources', indexController.getResourcesPage);
    router.get('/jobs', indexController.getJobsPage);
} else {
    console.error("❌ Error: One or more functions are missing in indexController.js");
}

module.exports = router;
