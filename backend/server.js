require("dotenv").config();
const express = require("express");
const app = express();
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const cors = require('cors');

const buyController = require("./controllers/buy-controller");
const indexController = require("./controllers/index_controller");
const playController = require("./controllers/play-controller");
const authController = require("./controllers/auth-controller");
const progressController = require('./controllers/progress-controller');
const authRoute = require("./routes/authRoute");
const isAuthenticated = require('./middleware/checkAuth').isAuthenticated;

app.set("view engine", "ejs");

// middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*"}))

app.use(session({
  genid: () => {
    return uuidv4();
  },
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  name: 'sessionId',
  cookie: {
    path: process.env.COOKIE_PATH,
    httpOnly: true,
    secure: 'auto',
    maxAge: 6 * 60 * 60 * 1000
  },
  store: new MemoryStore({
    checkPeriod: 86400000
  })
}));

app.use((req, res, next) => {
  console.log(req.session);
  next();
})

app.get("/", isAuthenticated, indexController.listComposers);

app.use("/auth", authRoute);
// app.post("/auth", authController.authenticate)

app.get("/buy", buyController.listBooks);
app.get("/buy/search", isAuthenticated, buyController.searchBooks);
app.get("/buy/purchase/:id", buyController.purchaseBook);
app.post("/buy/purchase-complete/:id", isAuthenticated, buyController.purchaseComplete);

app.get("/play", isAuthenticated, playController.playOverview);
app.post("/play", isAuthenticated, playController.changeSongProgress);
app.get("/play/search/song-progress/:userId", isAuthenticated, playController.searchSongProgress);

app.get("/my-progress", isAuthenticated, progressController.getProgressPage);

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}.`);
  console.log("Running on domain " + `${process.env.URL}`);
})
