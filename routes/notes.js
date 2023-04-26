const notes = require("express").Router();
const fs = require("fs");

// GET Route for retrieving the notes
notes.get("/", async (req, res) => {
  let data = await fs.promises.readFile("./db/db.json", "utf-8");
  let parsedData = await res.json(JSON.parse(data));
  return parsedData;
  //   readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// DELETE Route for a specific note
notes.delete("/:id", async (req, res) => {
  const noteId = req.params.id;
  let data = await fs.promises.readFile("./db/db.json", "utf-8");
  let parsedData = await res.json(JSON.parse(data));
  let result = await parsedData.filter((note) => note.id !== noteId);
  fs.writeFile("./db/db.json", JSON.stringify(result, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to db.json`)
  );
  res.json(`Item ${noteId} has been deleted.`);
  //   readFromFile("./db/db.json")
  //     .then((data) => JSON.parse(data))
  //     .then((json) => {
  //       // Make a new array of all notes except the one with the ID provided in the URL
  //       const result = json.filter((note) => note.id !== noteId);

  //       // Save that array to the filesystem
  //       writeToFile("./db/db.json", result);

  //       // Respond to the DELETE request
  //       res.json(`Item ${noteId} has been deleted.`);
  //     });
});

// POST Route for a new note
notes.post("/", (req, res) => {
  console.log(req.body);
});
module.exports = notes;
