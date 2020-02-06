const fs = require('fs');
// revert IDs and classes to old code
var $noteTitle = $("#note-title");
var $noteText = $("#textarea");
var $saveNoteBtn = $("#save");
var $newNoteBtn = $("#new");
var $noteList = $(".list-container .list-group");

// activeNote is used to keep track of the note in the textarea
var activeNote = {};

// A function for getting all notes from the db
var getNotes = function() {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "GET"
  });
};

// A function for saving a note to the db
var saveNote = function(note) {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST"
  });
}; 

// A function for deleting a note from the db
var deleteNote = function(id) {
  return $.ajax({
    url: "/api/notes" + id,
    data: note,
    method: "DELETE"
  });
};

// If there is an activeNote, display it, otherwise render empty inputs
var renderActiveNote = function() {
  $saveNoteBtn.hide();

  if (activeNote.id) {
    $noteTitle.attr("readonly", true);
    $noteText.attr("readonly", true);
    $noteTitle.val(activeNote.title);
    $noteText.val(activeNote.text);
  } else {
    $noteTitle.attr("readonly", false);
    $noteText.attr("readonly", false);
    $noteTitle.val("");
    $noteText.val("");
  }
};

// Get the note data from the inputs, save it to the db and update the view
var handleNoteSave = function() {
  var newNote = {
    title: $noteTitle.val(),
    text: $noteText.val(),
    id: $noteTitle.val()
  };

  saveNote(newNote).then(function(data) {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
var handleNoteDelete = function(event) {
  // prevents the click listener for the list from being called when the button inside of it is clicked
  event.stopPropagation();

  var note = $(this)
    .parent(".list-group-item")
    .data();

  if (activeNote.id === note.id) {
    activeNote = {};
  }

  deleteNote(note.id).then(function() {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
var handleNoteView = function() {
  activeNote = $(this).data();
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
var handleNewNoteView = function() {
  activeNote = {};
  renderActiveNote();
};

// If a note's title or text are empty, hide the save button
// Or else show it
var handleRenderSaveBtn = function() {
  if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
    $saveNoteBtn.hide();
  } else {
    $saveNoteBtn.show();
  }
};

// Render's the list of note titles
var renderNoteList = function(notes) {
  $noteList.empty();

  var noteListItems = [];

  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];

    var $li = $("<li class='list-group-item'>").data(note);
    var $span = $("<span>").text(note.title);
    var $delBtn = $(
      "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
    );

    $li.append($span, $delBtn);
    noteListItems.push($li);
  }

  $noteList.append(noteListItems);
};

// Gets notes from the db and renders them to the sidebar
var getAndRenderNotes = function() {
  return getNotes().then(function(data) {
    renderNoteList(data);
  });
};
// this is where you need to link the html to tthe functions
$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

// Gets and renders the initial list of notes
getAndRenderNotes();

/* Sent to the server:

  $(".submit").on("click", function(event) {
    event.preventDefault();

    // Here we grab the note elements
    var newNote = {
      noteTitle: $("#note-title").val().trim(),
      noteText: $("#note-text).val().trim(),
    };

    console.log(newNote);

    // This line is the magic. It's very similar to the standard ajax function we used.
    // Essentially we give it a URL, we give it the object we want to send, then we have a "callback".
    // The callback is the response of the server. In our case, we set up code in api-routes that "returns" true or false
    // depending on if a note is available or not.

    $.post("/api/notes", newNote,
      function(data) {

        // If the note is posted... tell user the note was posted successfully.
        if (data) {
          alert("Yay! Your note is posted successfully!");
        }

        // If the note was not posted... send an error message.
        else {
          alert("Sorry, your note was not posted.");
        }

        // Clear the form when submitting
        $("#note.title").val("");
        $("#note.text").val("");
      });

  });


*/


/* Retrieved from the server:

function runNoteQuery() {
    // The AJAX function uses the URL of our API to GET the data associated with it (initially set to localhost)
    $.ajax({ url: "/api/notes", method: "GET" })
      .then(function(notes) {

        // Here we then log the notes to console, where it will show up as an object.
        console.log(notes);
        console.log("------------------------------------");

        // Loop through and display each of the notes
        for (var i = 0; i < notes.length; i++) {

          // Get a reference to the notesList element and populate it with tables
          var notes = $("#noteList");

          // Then display the fields in the HTML (Section Name, Date, URL)
          var listItem = $("<li class='list-group-item mt-4'>");

          listItem.append(
            $("<h2>").text("Note #" + (i + 1)),
            $("<hr>"),
            $("<h2>").text("Note title: " + notes[i].title),
            $("<h2>").text("Note text : " + notes[i].noteText),
          );

          noteList.append(listItem);
        }
      });
  }

  // This function resets all of the data in our notes. This is intended to let you restart a demo.
  function clearNote() {
    alert("Clearing...");

    // Clear the notes on the server and then empty the elements on the client
    $.ajax({ url: "/api/clear", method: "POST" }).then(function() {
      $("#noteList").empty();
    });
  }

  $("#clear").on("click", clearTable);


  // Run Queries!
  // ==========================================
  runNoteQuery();
*/