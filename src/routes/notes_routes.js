const express = require("express");
const { createNotes, getNotes, deleteAllNotes, getNote } = require("../controllers/notes_controller");
const notesRouter = express.Router();

notesRouter.get("/", getNotes);

notesRouter.get("/:id", getNote);

notesRouter.post("/", createNotes);

notesRouter.delete("/clear", deleteAllNotes);

module.exports = notesRouter
