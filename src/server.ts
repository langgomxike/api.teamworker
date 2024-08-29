import express from "express";
import process from "dotenv"
import { log } from "./services/SLog";
import SMysql from "./services/SMysql";
import SFirebase from "./services/SFirebase";
import SEmail from "./services/SEmail";

const app = express();

const port: number | string = process.config().parsed?.PORT ?? 3000;

app.listen(port, () => {
    log(console.log, "running", "The server is listening", { port: port });

    // connect to mysql server
    SMysql.getConnection();

    // connect to firebase database server
    SFirebase.getDatabaseReference();
});


app.get("/", (req, res) => {
    res.redirect("/api");
});

app.get("/api", (req, res) => {
    res.send("Welcome to TEAM WORKER api");
});