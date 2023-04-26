const notes = require("express").Router();

// GET Route for retrieving the notes
notes.get("/", (req, res) => {
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// DELETE Route for a specific note
notes.delete("/:id", (req, res) => {});

// POST Route for a new note
notes.post("/", (req, res) => {
  console.log(req.body);
});
module.exports = notes;
