const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt-nodejs')

const app = express();

app.use(bodyParser.json());

const database = {
  users: [
    {
      id: "123",
      name: "John",
      email: "john@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Sally",
      email: "john@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date(),
    },
  ],
  login: [
      {
          id: '987',
          has: '',
          email: 'john@gmail.com'
      }
  ]
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
    // Load hash from your password DB.
bcrypt.compare("apples", '$2a$10$PMjZwkgoNosXKha0hRXELe.5p6NwVtUvH0jGqBXQXiJ5zAFJJFTEK', function(err, res) {
   console.log('first guess', res);
});
bcrypt.compare("veggies", '$2a$10$PMjZwkgoNosXKha0hRXELe.5p6NwVtUvH0jGqBXQXiJ5zAFJJFTEK', function(err, res) {
    console.log('second guess', res);
});
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("success");
  } else {
    res.status(400).json("error logging in");
  }
  res.json("signing");
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  bcrypt.hash(password, null, null, function(err, hash) {
    console.log(hash);
});
  database.users.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json("not found");
  }
});

app.post('/image/:id', (req, res) => {
  const { id } = req.params;
  console.log(req.params, "here");
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(400).json("not found");
  }
})



app.listen(3001, () => {
  console.log("app is running on port 3001");
});

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = return user object
/profile/:userId --> GET = user
/image --> PUT --> return updated user/count
*/
