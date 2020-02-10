let express = require('express');
var path = require('path');
const fs = require('fs');
 
app = module.exports = express();
 
app.set('file-path', path.join(__dirname, 'db.json'));
app.set('mess', '');

// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var notes = require("../journal.json");
// var waitListData = require("../data/waitinglistData");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function(req, res) {
  res.json(notes);
  });

/*
  app.get("/api/waitlist", function(req, res) {
    res.json(waitListData);
  });
*/
  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/notes", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    //if (notes.length < 5) {
      notes.push(req.body);
/* add ordered ID to notes */
req.body.id = notes.length;
      fs.writeFile("journal.json", JSON.stringify(notes), function(err) {
        if (err) {
          throw err;
        }
      });

      res.json(true);
 /*   }
    else {
      waitListData.push(req.body);
      res.json(false);
    } */
  });

  // ---------------------------------------------------------------------------
// DELETE

  app.delete("/api/notes/:id", function(req, res) {
    // Sets length of note to 0
    // notes.length = 0;
    var id = req.params.id;
    notes.splice(notes.id, 1);
    console.log("I just deleted")
   
    //write back to journal.json
    fs.writeFile("journal.json", JSON.stringify(notes), function(err) {
      if (err) {
        throw err;
      }
    });

    res.json(true);
/*   }
  else {
    waitListData.push(req.body);
    res.json(false);
  } */
});

  
};

/* fs.unlink(app.get('file-path'), function (e) {
 
        if (e) {
 
            app.set('mess', e.message);
            next();
 
        } else {
 
            res.json({
 
                mess: 'file deleted',
                path: app.get('file-path')
 
            });
 
        } */
