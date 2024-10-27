const express = require('express');

const progressController = {
	getProgressPage: async (req, res) => {
		res.render("progress/myProgress");
	}
}

module.exports = progressController;