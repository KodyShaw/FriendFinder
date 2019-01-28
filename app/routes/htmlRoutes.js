let express = require("express");
let router = express.Router();
let fs = require("fs");
let path = require("path");

router.get("/", (req, res) => {
    fs.readFile("./app/public/home.html", "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            return res.send("Something went wrong, please try again. There is someone waiting for some friends.");
        }
        res.send(data);
    });
});

router.get("/survey", (req, res) => {
    res.render("survey", {matchName: "", src: ""});
});

router.get("*", (req, res) => {
    fs.readFile("./app/public/home.html", "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            return res.send("Something went wrong, please try again. There is someone waiting for some friends.");
        }
        res.send(data);
    });
});

module.exports = router;