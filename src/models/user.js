const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    notes: [{type: mongoose.Types.ObjectId, ref: "Note"}]
});

const User = mongoose.model("User", UserSchema);

module.exports = User