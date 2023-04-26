const notes = require("express").Router();

// GET Route for retrieving the notes
notes.get("/", (req, res) => {
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// DELETE Route for a specific note
notes.delete("/:id", (req, res) => {
    const noteId = req.params.id;
readFromFile("./db/db.json")
  .then((data) => JSON.parse(data))
  .then((json) => {
    // Make a new array of all notes except the one with the ID provided in the URL
    const result = json.filter((note) => note.id !== noteId);

    // Save that array to the filesystem
    writeToFile("./db/db.json", result);

    // Respond to the DELETE request
    res.json(`Item ${noteId} has been deleted.`);
  });
});

// POST Route for a new note
notes.post("/", (req, res) => {
  console.log(req.body);
});
module.exports = notes;
