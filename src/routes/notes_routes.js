const express = require("express");
const { createNotes, getNotes, deleteAllNotes, getNote, deleteNote } = require("../controllers/notes_controller");
const notesRouter = express.Router();

notesRouter.get("/", getNotes);

notesRouter.get("/:id", getNote);

notesRouter.post("/", createNotes);

notesRouter.delete("/clear", deleteAllNotes); //before the next delete route or else it will consider clear as an id

notesRouter.delete("/:id", deleteNote);

module.exports = notesRouter
