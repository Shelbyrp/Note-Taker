// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const http = require("http");
const id = require('nanoid');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));

app.get('/', (req, res) => 
res.sendFile(path.join(__dirname, './public/index.html')));

app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, './public/notes.html')));

app.get('/api/notes', (req, res) => 
res.sendFile(path.join(__dirname, './db/db.json')));

app.post('/api/notes', (req, res) => {  
    const createNote = req.body;
    req.body.id = id.nanoid(5);
  
    fs.readFile("./db/db.json", (err, data) => {
      if (err) throw err;
      let newNote = JSON.parse(data);
      newNote.push(createNote);
  
      fs.writeFile("./db/db.json",
        JSON.stringify(newNote),
        function (err) {
          if (err) throw err;
        }
      );
    });
    res.json({
      status: "success",
    });
  });

app.listen(PORT, () => 
console.log(`Server is listing to ${PORT}`));