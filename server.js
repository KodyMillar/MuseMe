require("dotenv").config();
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const buyController = require("./controllers/buy-controller");
const indexController = require("./controllers/index_controller");
const playController = require("./controllers/play-controller");
const authController = require("./controllers/auth-controller");
const progressController = require('./controllers/progress-controller');
const authRoute = require("./routes/authRoute");

app.set("view engine", "ejs");

// middleware
app.use(express.json());
// app.use(expressLayouts);
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

app.get("/", indexController.listComposers);

app.use("/auth", authRoute);
// app.post("/auth", authController.authenticate)

app.get("/buy", buyController.listBooks);
app.get("/buy/search", buyController.searchBooks);
app.get("/buy/purchase/:id", buyController.purchaseBook);
app.post("/buy/purchase-complete/:id", buyController.purchaseComplete);

app.get("/play", playController.playOverview);
app.post("/play", playController.changeSongProgress);
app.get("/play/search/song-progress/:userId", playController.searchSongProgress);

app.get("/my-progress", progressController.getProgressPage);

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}.`);
  console.log("Running on domain " + "http://127.0.0.1:8000/");
})
