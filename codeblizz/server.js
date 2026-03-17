const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());

let users = [];
let items = [
  { id: 1, name: "Laptop", highestBid: 1000, bidder: null }
];
let bids = [];

// Register
app.post("/register", (req, res) => {
  users.push(req.body);
  res.send("User registered");
});

// Login
app.post("/login", (req, res) => {
  const user = users.find(
    u => u.username === req.body.username && u.password === req.body.password
  );
  res.send(user ? user : null);
});

// Get items
app.get("/items", (req, res) => {
  res.json(items);
});

// Place bid
app.post("/bid", (req, res) => {
  const { itemId, bidAmount, bidder } = req.body;
  let item = items.find(i => i.id == itemId);

  if (bidAmount > item.highestBid) {
    item.highestBid = bidAmount;
    item.bidder = bidder;
    bids.push({ itemId, bidAmount, bidder });
    res.send("Bid placed");
  } else {
    res.send("Bid too low");
  }
});

// Auto-bid system
app.post("/autobid", (req, res) => {
  const { itemId, maxBid, bidder } = req.body;
  let item = items.find(i => i.id == itemId);

  if (maxBid > item.highestBid) {
    item.highestBid = maxBid;
    item.bidder = bidder;
    res.send("Auto bid applied");
  } else {
    res.send("Auto bid too low");
  }
});

// Admin view bids
app.get("/bids", (req, res) => {
  res.json(bids);
});

app.listen(3000, () => console.log("Server running on port 3000"));