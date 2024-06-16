const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
const db = require("../config/db");
const {v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const userService = require("../services/userService");

router.get("/login", (req, res) => {
	res.render("authentication/login", {
		wrongEntry: null
	});
})

router.get("/register", (req, res) => {
	res.render("authentication/register")
})

router.get("/welcome", (req, res) => {
	res.render("authentication/welcome");
})

router.post("/login", (req, res) => {

	const username = req.body.username;
	const password = req.body.password;
	// const isAuthenticated = authController.authenticate(username, password);
	const isAuthenticated = userService.authenticateUser(username, password)
	console.log(isAuthenticated)
	if (isAuthenticated) {
		res.redirect("/");	
	}
	rejectedMessage = "Rejected"
	// res.redirect('/auth/login');
	res.redirect(`/auth/login?message=${rejectedMessage}`);

	// statement = `SELECT * FROM user_account WHERE username = ${req.params.username}`;
	// db.execute(statement, (err, result) => {
	// 	if (err) throw err;
		
	// 	else if (req.params.password === result.password) {
	// 		console.log("correct");
	// 		res.redirect("/");
	// 	}
		
	// 	else {
	// 		console.log("incorrect")
	// 		res.redirect("/login", {
	// 			wrongEntry: "Incorrect login details"
	// 		});
	// 	}
	// })
})

router.post("/register", (req, res) => {
	const uuid = uuidv4()
	const user = req.body;

	const saltrounds = 10;
	bcrypt.hash(user.password, saltrounds, (err, hash) => {
		const statement = `INSERT INTO user_account VALUES
		('${uuid}', '${user.username}', '${hash}', '${user.firstName}', '${user.lastName}', '${user.email}');`

		db.execute(statement, (err, result) => {
			if (err) throw err;
			res.redirect("/auth/welcome");
	});


	})
})

module.exports = router;