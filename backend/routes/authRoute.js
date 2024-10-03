const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");

router.get("/login", async (req, res) => {
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

router.post("/login", async (req, res) => {
	try {
		const {username, password} = req.body
	
		const isAuthenticated = await authController.authenticate(username, password);
		console.log(isAuthenticated)
	
		if (isAuthenticated) {
			req.session.isLoggedIn = true;
			req.session.user = username;
			req.session.save(() => {
				console.log('SAVED')
				res.redirect("/");	
			})
		}
		else {
			rejectedMessage = "Rejected"
			res.redirect(`/auth/login?message=${rejectedMessage}`);
		}

	} catch (err) {
		console.log(err);
	}
});

router.post("/register", async (req, res) => {
	const userInfo = req.body;

	try {
		const userCreated = await authController.register(userInfo);
		
		if (!userCreated) {
			res.redirect('/auth/register');
		}
		else {
			res.redirect('/auth/welcome');
		}

	} catch (err) {
		console.log(err);
		res.redirect("/auth/register");
	}
})

module.exports = router;