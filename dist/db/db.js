const mongoose = require("mongoose");
require("dotenv").config();

function init() {
  new mongoose.connect(
    "mongodb+srv://veershindedb:Veershinde@cluster0.ngome.mongodb.net/attainu?retryWrites=true&w=majority",
    function (err) {
      if (err) {
        console.log("error in mongo connection");
      } else {
        console.log("mongo successfully connected");
      }
    }
  );
}
init();

module.exports = { init };
