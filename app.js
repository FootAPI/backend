const express = require("express"),
  rateLimit = require("express-rate-limit"),
  cors = require("cors"),
  app = express(),
  clubs = require("./clubs.json");

function randomProperty(obj) {
  var keys = Object.keys(obj);
  return obj[keys[(keys.length * Math.random()) << 0]];
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
app.use(express.json());
app.use(cors());

app.get("/clubs", (req, res) => {
  res.json(clubs);
});

app.get("/clubs/:league", (req,res) => {
  var leagueReq = req.params.league;
  if(clubs[leagueReq]) {
    res.json({league: clubs[leagueReq]})
  } else {
    res.status(404).json({ message: "Not Found" });
  }
})

app.get("/clubs/random", (req, res) => {
  var randomClub = randomProperty(randomProperty(clubs));
  res.json({ random: randomClub });
});

app.get("/clubs/random/:league", (req, res) => {
  if (clubs[req.params.league]) {
    var randomClub = randomProperty(clubs[req.params.league]);
    res.json({ random: randomClub });
  } else {
    res.status(404).json({ message: "Not Found" });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`[FootAPI] Backend listening on port ${port}`);
});
