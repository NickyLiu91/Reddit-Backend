const express = require("express");
const Joi = require('joi');

var app = express();

app.use(express.json());

const port = process.env.PORT || 3000

const accounts = [
  {id: 1, name: "Yugi"},
  {id: 2, name: "Kaiba"},
  {id: 3, name: "Joey"}
]

const threads = [
  {id: 1, account_id: 1, title: "Yugi Post 1"},
  {id: 2, account_id: 2, title: "Kaiba Post 1"},
  {id: 3, account_id: 3, title: "Joey Post 1"}
]

const posts = [
  {id: 1, account_id: 1, post_id: 1, text: "Dark Magician is the best!"},
  {id: 2, account_id: 2, post_id: 1, text: "No, Blue-Eyes is the best!"},
  {id: 3, account_id: 3, post_id: 3, text: "Time-wizard!"}
]

app.listen(port, () => {
   console.log(`server on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello good sir!");
})

app.get("/api/heroes", (req, res) => {
  res.send(heroes);
})

app.get("/api/heroes/:id", (req, res) => {
  let hero = heroes.find(c => c.id === parseInt(req.params.id))
  if (!hero) {
    res.status(404).send('The hero with the given ID was not found')
  } else {
    res.send(hero)
  }
})

app.post("/api/heroes", (req, res) => {
  const schema = {
    name: Joi.string().min(2).required()
  }

  const result = Joi.validate(req.body, schema)

  if (result.error) {
    res.status(400).send(result.error.details[0].message)
    return;
  }

  let hero = {
    id: heroes.length + 1,
    name: req.body.name
  }
  heroes.push(hero)
  res.send(hero);
})

app.put("/api/heroes/:id", (req, res) => {
  let hero = heroes.find(c => c.id === parseInt(req.params.id))

  if (!hero) {
    res.status(404).send('The hero with the given ID was not found')
    return;
  }

  const schema = {
    name: Joi.string().min(2).required()
  }

  const result = Joi.validate(req.body, schema)

  if (result.error) {
    res.status(400).send(result.error.details[0].message)
    return;
  }

  hero.name = req.body.name;
  res.send(hero)
})

app.delete("/api/heroes/:id", (req, res) => {
  let hero = heroes.find(c => c.id === parseInt(req.params.id))

  if (!hero) {
    res.status(404).send('The hero with the given ID was not found');
    return;
  }
  console.log(hero)

  const index = heroes.indexOf(hero);
  console.log(index)
  heroes.splice(index, 1);

  res.send(hero)
})
