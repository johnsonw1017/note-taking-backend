const Note = require("../models/notes");

const getNotes = async (request, response) => {

    let notes = await Note.find();
    response.json({notes: notes});
}

const getNote = async (request, response) => {

    try {
        let note = await Note.findById(request.params.id); // also can do .catch(error => {}) in this line
        response.send(note);
    } catch (error) {
        response.status(404).send({error: error});
        console.error(`Error while accessing data. Error: ${error}`);
    }
    
}

const createNotes = async (request, response) => {
    let newNote = new Note({
        title: request.body.title,
        description: request.body.description,
        isCompleted: false,
        dueDate: new Date().setDate(new Date().getDate() + 1),
        createdAtDate: Date.now()
    });

    await newNote.save();
    
    response.status(201).json({note: newNote});
}

const updateNote = async (request, response) => {

    try {
        let updatedNote = await Note.findByIdAndUpdate(request.params.id, request.body, {new: true}); //set new: true to receive the updated note
        response.send(updatedNote);
    } catch (error) {
        response.status(404).send({error: error});
        console.error(`Error while accessing data. ${error}`);
    }
}

const deleteAllNotes = async (request, response) => {

    await Note.deleteMany({});
    response.json({
        message: "all notes deleted"
    });
}

const deleteNote = async (request, response) => {
    //find note by id then delete note

    try {
        await Note.findByIdAndDelete(request.params.id)
        response.json({
            message: "note deleted"
        });
    } catch (error) {
        response.status(404).send({error: error});
        console.error(`Error while accessing data. ${error}`);
    }
}

module.exports = {
    getNotes,
    getNote,
    createNotes,
    updateNote,
    deleteAllNotes,
    deleteNote
}