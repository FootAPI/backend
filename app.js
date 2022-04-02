const express = require("express");
const app = express();

const clubs = require("./clubs.json");

function randomProperty(obj) {
  var keys = Object.keys(obj);
  return obj[keys[ keys.length * Math.random() << 0]];
};

app.get("/clubs", (req, res) => {
  res.json(clubs)
});

app.get("/clubs/random", (req, res) => {
  var randomClub = randomProperty(randomProperty(clubs));
  res.json({random: randomClub});
});

app.get("/clubs/random/:league", (req, res) => {
  if (clubs[req.params.league]) {
    var randomClub = randomProperty(clubs[req.params.league]);
    res.json({random: randomClub});
  } else {
    res.status(404).json({message: "Not Found"})
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`[FootAPI] Backend listening on port ${port}`);
});
