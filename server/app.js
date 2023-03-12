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
const Image = require("./models/Images")
const jsonParser = bodyParser.json()
const multer = require("multer")
let recipeid = ""
//const upload = multer({storage: multer.memoryStorage})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

/*
var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, './public/images/')     // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
      callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
var upload = multer({
  storage: storage
});
*/

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


app.get("/api/recipe/:food", async (req,res) => {
  try {
    console.log("Nyt etitään safkaa")
  console.log(req.params.food)
  //res.send(req.params.food)
  let recipe = await Recipe.findOne({name: req.params.food})
  if (recipe == null) {
    console.log("No recipe found on this article")
    res.json({Failure: "No recipe found on this article"})
    return
  }
  console.log("läpi")
  console.log(recipe)
  res.json(recipe)
  //Recipe.findOne({})
  } catch(err) {
    console.log(err)
    res.send(err)
}

})

app.get("/hello", (req,res) => {
  try {
  console.log("päivää")
  res.json({tervehdys: "Päivää"})
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
/*
app.post("/api/images", async (req,res) => {
  console.log(req.body)
  res.json({juu: "ei"})
})
*/
app.post("/api/images", multer({storage: multer.memoryStorage()}).single("image"), async (req, res) => {
  console.log("Tästä alkaa filu")
  console.log(recipeid)
  //console.log("ja id: "+req.id)
  //console.log("ja id: "+req.file.id)
  //console.log(req.body)
  const imageName = req.file.originalname
  //const description = req.body.description
  const imageBuffer = req.file.buffer
  const imageEncoding = req.file.encoding
  const imageMimetype = req.file.mimetype
  //buffer: "hei"
  const image = new Image ({
    name: imageName,
    encoding: imageEncoding,
    mimetype: imageMimetype,
    buffer: imageBuffer
  })
  try {

    image.save()
    console.log()
    

    let ressu = await Recipe.findById(recipeid)
    console.log(ressu)
    if(!ressu) {
      console.log("eri löyry")
    } else {
      console.log("löyty resepti: "+ressu)
      //ressu.images.push(image)
      //ressu.save()
      console.log(ressu)

      res.json(image)
    }
  } catch (err) {
    console.log(err)
    res.send(err)
  }



  //console.log(description, imageName)
  console.log({imageName, imageBuffer, imageEncoding, imageMimetype})
  
  /*
  res.send({imageName, imageBuffer})
  if (!req.file) {
      console.log("No file upload");
  } else {
      console.log("filu tietoja")
      console.log(req.file.filename)
      console.log(req.file)
      console.log(req.body)
       
  }
  */
});

app.get("/api/images/:imageid", async (req,res) => {
  try {
    console.log("*********************etsitään kuvaa******************************")
    console.log(req.params.imageid)
    //res.send(req.params.food)
    let imgur = await Image.findById(req.params.imageid)
    console.log("kuva: "+imgur)
    
    if(!imgur) {
      res.json({ei: "kuvaa"})
      return
    }
    
    console.log(imgur)
    res.json(imgur)
  } catch(err) {
    console.log(err)
    res.json(err)
  }
})

app.post("/api/recipe", async (req,res) => {
  //console.log(req.body)

  const recipe = new Recipe ({
    name: req.body.name,
    instructions: req.body.instructions,
    ingredients: req.body.ingredients,
    categories: req.body.categories
})
  try {
    recipe.save()
    console.log(recipe)
    recipeid=recipe._id
    console.log("ja recipeid on:"+recipeid)
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

