const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller');
const userService = require('../services/userService');

router.get("/login", async (req, res) => {

	res.render("authentication/login");
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
	
		if (isAuthenticated) {
			const userId = await userService.getUserId(username);

			req.session.isLoggedIn = true;
			req.session.user = username;
			req.session.userId = userId;
			req.session.save(() => {
				console.log('Saved user to session');
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
});

router.delete('/login', async (req, res) => {
	try {
		req.session.isLoggedIn = false;
		delete req.session.user;
		delete req.session.userId;
		req.session.destroy(err => {
			if (err) return res.status(500).send("Failed to destroy session");
			return res.status(200).json({ message: "Successfully logged out" })

		});
		// res.redirect('/auth/login');

	} catch (err) {
		console.log(err)
		res.status(500).send("network or server error")
	}
});

module.exports = router;