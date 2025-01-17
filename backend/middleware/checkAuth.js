
module.exports = {
	isAuthenticated: (req, res, next) => {
		isLoggedIn = req.session.isLoggedIn;
		if (isLoggedIn) next();
		else {
			console.log("User not in session body");
			res.sendStatus(401);
		}
		// else res.redirect('/auth/login');
	}
}