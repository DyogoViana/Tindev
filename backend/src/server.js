//server.js


// Importação.
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes");
const server = express();

// conexão com o banco de dados mongodb Atlas.
mongoose.connect("mongodb+srv://whiteRabbit:freedom42@tindev-6dudd.mongodb.net/tindev42?retryWrites=true&w=majority", {
    useNewUrlParser: true
});

server.use(cors());
server.use(express.json());
server.use(routes);

//porta.
server.listen(3333);