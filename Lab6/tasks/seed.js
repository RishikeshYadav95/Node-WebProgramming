const connection = require("../config/mongoConnection");
const restaurants = require("../data/restaurants");
const reviews = require("../data/reviews");

async function main() {
  const db = await connection();
  await db.dropDatabase();
  const date = new Date().toLocaleDateString();
  const kebabP = await restaurants.create(
    "Kebab Palace",
    "Secaucus, New Jersey",
    "646-904-0984",
    "http://www.thebestkebabs.com",
    "$$",
    ["Middle Eastern", "Indian"],
    { dineIn: true, takeOut: true, delivery: true }
  );
  const id = kebabP._id;
  await reviews.create(
    id,
    "Great Experience",
    "Prithvi Punjabi",
    5,
    date,
    "I would definitely recommend this restaurant to everyone!"
  );
  await reviews.create(
    id,
    "The food made me sick!",
    "Kevin Gala",
    1,
    date,
    "I would never recommend this restaurant to everyone! Terrible food! It gave me explosive diarrhoa! Ew."
  );
  await reviews.create(
    id,
    "Meh...",
    "Priyanka Vaswani",
    2,
    date,
    "Nothing special honestly. One time try AT BEST. Quite underwhelmed. Hmm.. 'Meh' describes it perfectly."
  );

  const champP = await restaurants.create(
    "Champion Pizza",
    "Hoboken, New Jersey",
    "126-902-0982",
    "http://www.champions.com",
    "$",
    ["Italian", "Fusion"],
    { dineIn: false, takeOut: true, delivery: true }
  );
  id2 = champP._id;
  await reviews.create(
    id2,
    "Best Pizzas in Hoboken!",
    "Patrick Hill",
    5,
    date,
    "Man Oh Man! What pizzas! I am at a loss for words. A must try. Wow. Exceptional."
  );
  await reviews.create(
    id2,
    "Good pizzas, bad management",
    "Method Man",
    3,
    date,
    "I really enjoyed the pizzas, but the manager was so rude. Sucks that such a good place will go down because of one nasty dude. Change your manager asap."
  );
  await reviews.create(
    id2,
    "Soggy Pizzas, Soggy Service",
    "Clark Kent",
    2,
    date,
    "I came here with great expectations but was left extremely disappointed. Bad service, soggy pizza crust. I could've done better at home."
  );
  const papaJ = await restaurants.create(
    "Papa Johns",
    "Manhattan, New York",
    "917-201-0879",
    "http://www.papajohns.com",
    "$$",
    ["Italian", "Fusion", "Mexican"],
    { dineIn: true, takeOut: true, delivery: true }
  );

  console.log("Done seeding database");

  await db.s.client.close();
}

main();
