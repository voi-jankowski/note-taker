const notes = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// GET Route for retrieving the notes
notes.get("/", async (req, res) => {
  let data = await fs.promises.readFile("./db/db.json", "utf-8");
  let parsedData = await res.json(JSON.parse(data));
  return parsedData;
});

// DELETE Route for a specific note
notes.delete("/:id", async (req, res) => {
  // Create a variable with the id that has to be deleted
  const noteId = req.params.id;
  // Create an array with all the saved notes.
  let data = await fs.promises.readFile("./db/db.json", "utf-8");
  let parsedNotes = [].concat(JSON.parse(data));
  // Make a new array of all notes except the one with the ID provided in the URL
  let result = await parsedNotes.filter((note) => note.id !== noteId);
  // and save it to the db
  fs.writeFile("./db/db.json", JSON.stringify(result, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to db.json`)
  );
  res.json(`Item ${noteId} has been deleted.`);
});

// POST Route for a new note
notes.post("/", async (req, res) => {
  //    Make the values in the object of the new note available
  const { title, text } = req.body;
  //   And create new object with the unique id
  try {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };
    // Create an array with all the saved notes.
    let data = await fs.promises.readFile("./db/db.json", "utf-8");
    let parsedData = JSON.parse(data);
    // Push the new note into that array
    parsedData.push(newNote);
    // and save it to the db
    fs.writeFile("./db/db.json", JSON.stringify(parsedData, null, 4), (err) =>
      err ? console.error(err) : console.info(`\nData written to db.json`)
    );
    res.json(`Note added successfully!`);
  } catch (error) {
    res.error("Error in adding tip");
  }
});
module.exports = notes;
