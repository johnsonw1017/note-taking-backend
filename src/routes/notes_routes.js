const express = require("express");
const { createNotes, getNotes, deleteAllNotes } = require("../controllers/notes_controller");
const notesRouter = express.Router();

notesRouter.get("/", getNotes);

notesRouter.post("/", createNotes);

notesRouter.delete("/clear", deleteAllNotes)

module.exports = notesRouter
