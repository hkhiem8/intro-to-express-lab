const express = require("express");
const app = express();

// data
const collectibles = [
  { name: "shiny ball", price: 5.95 },
  { name: "autographed picture of a dog", price: 10 },
  { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
];

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" },
];

app.get("/greetings/:username", (req, res) => {
  res.send(`Hello there, ${req.params.username}!`);
});

app.get("/roll/:number", (req, res) => {
  if (isNaN(req.params.number)) {
    return res.send("You must specify a number.");
  } else {
    res.send(`You rolled a ${Math.floor(Math.random() * req.params.number)}`);
  }
});

app.get("/collectibles/:index", (req, res) => {
    if (isNaN(req.params.index) || req.params.index < 0) {
    return res.send("This item is not yet in stock. Check back soon!");
  } else {
    res.send(
      `So you want the ${collectibles[req.params.index].name}? For ${
        collectibles[req.params.index].price
      }, it can be yours!`
    );
  }
});

app.get("/shoes", (req, res) => {
  const minPrice = req.query["min-price"];
  const maxPrice = req.query["max-price"];
  const type = req.query.type;

  let filteredShoes = shoes;

  if (minPrice) {
    filteredShoes = filteredShoes.filter((shoe) => shoe.price >= minPrice);
  }
  if (maxPrice) {
    filteredShoes = filteredShoes.filter((shoe) => shoe.price <= maxPrice);
  }
  if (type) {
    filteredShoes = filteredShoes.filter((shoe) => shoe.type === type);
  }
  res.send(filteredShoes);
});

app.listen(3000, () => {
  console.log("I am listening");
});
