// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");
const fs = require('fs');


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // HTML GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content
  // ---------------------------------------------------------------------------


  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  
  app.get("../assets/css/styles.css", function(req, res) {
    res.sendFile(path.join(__dirname, "../assets/css/styles.css"));
  });

  app.get("../assets/js/index.js", function(req, res) {
    res.sendFile(path.join(__dirname, "../assets/js/index.js"));
  });
/*
  app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
*/
  // If no matching route is found default to home
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
