const express = require("express");
const path = require("path");
const fs = require("fs");
const notesRouter = require("./routes/notes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, "../Develop/public")));

app.use("/api/notes", notesRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Develop/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port 3001`);
});
