import express from "express";

const app = express();

const port: number = 3000;

app.get("/", (req, res) => {
    res.redirect("/api");
});

app.get("/api", (req, res) => {
    res.send("Welcome to TEAM WORKER api");
});

app.listen(port, () => {
    console.log("The server is listening on port " + port)
});