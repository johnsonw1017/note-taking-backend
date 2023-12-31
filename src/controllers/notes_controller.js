const Note = require("../models/notes");
const User = require("../models/user");

const getNotes = async (request, response) => {
    // request.query is an object
    let notes;

    //query string would only work for isCompleted (true or false)
    if (request.query.isCompleted === "true" || request.query.isCompleted === "false"){
        notes = await Note.find({isCompleted: request.query.isCompleted});
    } else {
        notes = await Note.find();
    }
    response.send(notes);
}

const getMyNotes = async (request, response) => {
    //find user by username
    let user = await User.findOne({username: request.body.username}).populate("notes");
    response.send(user.notes)
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
    let user = await User.findOne({username: request.body.username});
    let newNote = new Note({
        title: request.body.title,
        description: request.body.description,
        isCompleted: request.body.isCompleted,
        dueDate: request.body.dueDate,
        createdAtDate: Date.now()
    });
    await newNote.save();

    try {
        user.notes.push(newNote._id);
        await user.save();
    } catch (error) {
        response.status(404).send({message: "user does not exist"})
    }

    response.status(201).json({newNote});
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
    let user = await User.findOne({username: request.body.username});
    //find note by id then delete note

    try {
        await Note.findByIdAndDelete(request.params.id);
        user.notes.shift(request.params.id);
        response.json({
            message: "note deleted",
            user: user
        });
    } catch (error) {
        response.status(404).send({error: error});
        console.error(`Error while accessing data. ${error}`);
    }
}

module.exports = {
    getNotes,
    getNote,
    getMyNotes,
    createNotes,
    updateNote,
    deleteAllNotes,
    deleteNote
}