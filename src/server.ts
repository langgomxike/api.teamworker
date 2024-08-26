import express from "express";
import process from "dotenv"
import { log } from "./services/SLog";

const app = express();

const port: number | string = process.config().parsed?.PORT ?? 3000;

app.get("/", (req, res) => {
    res.redirect("/api");
});

app.get("/api", (req, res) => {
    res.send("Welcome to TEAM WORKER api");
});

app.listen(port, () => {
    log(console.warn, "running", "The server is listening", { port: port });
});