const User = require("../models/user")

const signup = async (request, response) => {
    let newUser = new User({
        username: request.body.username
    });

    await newUser.save()
                .catch(error => {
                    console.log(`Encountered an error: ${error}`);
                    response.send({error: "username already exists"});
                })
    response.send(newUser);
}

module.exports = {
    signup
}