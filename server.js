// Import the required modules
const express = require("express");
const fs = require("fs");
const path = require("path");
const http = require("http");
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.json(path.join(__dirname, "public/assets/index.html"));
  });
  


app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});