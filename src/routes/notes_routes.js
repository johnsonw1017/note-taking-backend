const express = require("express");
const { createNotes, getNotes } = require("../controllers/notes_controller");
const notesRouter = express.Router();

notesRouter.get("/", getNotes);

notesRouter.post("/", createNotes);

module.exports = notesRouter
