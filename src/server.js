const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose"); //ODM
const app = express();

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || "127.0.0.1";

const helmet = require("helmet");
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.contentSecurityPolicy({
    directives:{
        defaultSrc: ["self"]
    }
}));

const cors = require("cors");
let corsOptions = {
    origin: ["http://localhost:3000"],
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

let databaseURL = "";

switch (process.env.NODE_ENV.toLowerCase()){
    case "production":
        databaseURL = process.env.DATABASE_URL;
        break;
    case "development":
        databaseURL = "mongodb://localhost:27017/not_taking_db";
        break;
    case "test":
        databaseURL = "mongodb://localhost:27017/not_taking_db_test";
        break;
    default:
        console.error("Wrong environment mode, database cannot connect");
}

const {databaseConnector} = require("./database");

databaseConnector(databaseURL).then(() => {
    console.log("connected to the db");
}).catch(error => {
    console.error("could not connect to db," + error);
}); 

app.get("/databaseHealth", (request, response) => {
    let databaseState = mongoose.connection.readyState;
    let databaseName = mongoose.connection.name;
    let databaseModels = mongoose.connection.modelNames();
    let databaseHost = mongoose.connection.host;

    response.json({
        readyState: databaseState,
        dbName: databaseName,
        dbModels: databaseModels,
        dbHost: databaseHost
    })
})

app.get("/", (request, response) => {
    response.json({
        message: "Welcome to the note taking backend"
    });
});

const notesRouter = require("./routes/notes_routes");
app.use("/notes", notesRouter);

const usersRouter = require("./routes/users_routes");
app.use("/users", usersRouter);

app.get("*", (request, response) => {
    response.status(404).json({
        message: "Route not found",
        path: request.path
    })
})

module.exports = {
    app, PORT, HOST
}