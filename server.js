// jai shree shyam
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const ejs = require("ejs");
const path = require("path");
const bcrypt = require("bcrypt");
var expressLayouts = require("express-ejs-layouts");
const homeroutes = require("./routes/homeroutes");
const session = require("express-session");
const flash = require("express-flash");
const MongoStore = require("connect-mongo");
const { init } = require("./db/db");
const passport = require("passport");
init();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");
app.use(expressLayouts);

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://veershindedb:Veershinde@cluster0.ngome.mongodb.net/attainu?retryWrites=true&w=majority",
    }),
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 15 },
  })
);

//passport initialisasion
const passportinit = require("./app/config/passport");
passportinit(passport);
app.use(passport.initialize());
app.use(passport.session());

//global middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});

app.use(flash());

app.use("/", homeroutes);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
