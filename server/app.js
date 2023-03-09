var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const mongoDB = "mongodb://127.0.0.1:27017/testdb";
//const mongoDB = "mongodb://localhost:27017/testdb";
const Recipe = require("./models/Recipes");
const jsonParser = bodyParser.json()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//setting database connection
mongoose.set("strictQuery", false);
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB error"));

app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.get("/recipe/:food", async (req,res) => {
  try {
  console.log(req.params.food)
  res.send(req.params.food)
  let recipe = await Recipe.findOne({name: req.params.food})
  if (recipe = null) {
    console.log("No recipe found on this article")
    res.send("No recipe found on this article")
    return
  }
  //Recipe.findOne({})
  } catch(err) {
    console.log(err)
    res.send(err)
}

})

app.get("/hello", (req,res) => {
  try {
  console.log("päivää")
  res.send("Päivää")
  } catch (err) {
    console.log(err)
    res.send(err)
  }
});
/*
app.get("/hello", (req,res) => {
  res.send("Hello world toimiiko kukkuu :)");
});
*/

app.post("/recipe", async (req,res) => {
  console.log(req.body)

  const recipe = new Recipe ({
    name: req.body.name,
    instructions: req.body.instructions,
    ingredients: req.body.ingredients
})
  try {
    recipe.save()
    res.json(recipe)
  } catch (err) {
    console.log(err)
    res.send(err)
}
   

})

//setting cors options, so we can connect to server from client on dev env
if (process.env.NODE_ENV === "development") {
    var corsOptions = {
        origin: "http://localhost:3000",
        optionsSuccessStatus: 200,
    };
    app.use(cors(corsOptions))
}



module.exports = app;

