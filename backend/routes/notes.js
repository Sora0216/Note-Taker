const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const notesFilePath = path.join(__dirname, "../data/notes.json");

router.get("/", (req, res) => {
  fs.readFile(notesFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading notes file" });
    }
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

router.post("/", (req, res) => {
  const newNote = req.body;
  fs.readFile(notesFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading notes file" });
    }
    const notes = JSON.parse(data);
    notes.push(newNote);
    fs.writeFile(notesFilePath, JSON.stringify(notes), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error writing notes file" });
      }
      res.status(201).json(newNote);
    });
  });
});

module.exports = router;
