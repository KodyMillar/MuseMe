
module.exports = {
	isAuthenticated: (req, res, next) => {
		isLoggedIn = req.session.isLoggedIn;
		if (isLoggedIn) next()
		else res.redirect('/auth/login');
	}
}