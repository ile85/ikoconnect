const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

console.log("🔹 indexController:", indexController); // Debugging log

// Ensure the function is properly assigned
if (indexController && typeof indexController.getHomepage === 'function') {
    console.log("✅ getHomepage function found, attaching to route!");
    router.get('/', indexController.getHomepage);
} else {
    console.error("❌ Error: 'getHomepage' is not defined or is not a function in indexController.js");
}

module.exports = router;
