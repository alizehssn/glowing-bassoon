const { fstat } = require("fs")
const fs = require("fs");

module.exports = function(app) {
    //Reading JSON DB File and returning saved notes
    app.get("/api/notes", function(req, res) {
        fs.readFile(__dirname + "/../db/db.json", (err, data) => {
            if (err) throw err
            let jsonData = JSON.parse(data);
            return res.json(jsonData);

        })
    });

    //API Post Requests: Save Notes

    app.post("/api/notes", function(req, res) {
        var newNote = req.body;
        let savedNotes = [];
        let id = 0;
        fs.readFile(__dirname + "/../db/db.json", (err, data) => {
            if (err) throw err
            savedNotes = JSON.parse(data);
            for (var i = 0; i < savedNotes.length; i++) {
                if (savedNotes[i].id > id) {
                    id = savedNotes[i].id
                }
            }
            newNote.id = parseInt(id) + 1;
            savedNotes.push(newNote);
            fs.writeFile(__dirname + "/../db/db.json", JSON.stringify(savedNotes), "utf8", err => {
                if (err) throw err
                res.end()
            })
        })
    });

    //Delete Notes

    app.delete("/api/notes/:id", function(req, res) {
        var noteTitle = req.params.id;
        console.log("this is the note title" + req.params);
        console.log("im the note title " + noteTitle)
        fs.readFile(__dirname + "/../db/db.json", (err, data) => {
            if (err) throw err
            var remainNotes = JSON.parse(data).filter(entry => {
                return entry.id != noteTitle
            })
            console.log("remaining note:" + remainNotes)
            fs.writeFile(__dirname + "/../db/db.json", JSON.stringify(remainNotes),
                "utf8", err => {
                    if (err) throw err
                    res.end()
                })
        })

    })




}