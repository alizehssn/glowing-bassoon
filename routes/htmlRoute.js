//Set Dependencies: Path function from express to find the html file
const path = require("path");

//Routing to the files

module.exports = function(app) {
    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"))
    })
}