require('dotenv').config();
const { Router } = require('express');
const pool = require('../config/db');
const router = Router();

router.post('/sendotp', (req, res) => {
	let response = {
		app_name: process.env.APP_NAME,
		userID: process.env.EMAILJS_USERID,
		serviceID: process.env.EMAILJS_SERVICEID,
		templateID: process.env.TEMPLATE_OTP
	};
	if (req.body.type === "user") {
		pool.query(`SELECT username, email FROM users WHERE username = '${req.body.value}';`, (error, results) => {
			if (error) {
				res.status(500).send(error);
			}
			if (results !== undefined) {
				response = {
					...response,
					email: results.rows[0].email,
					username: results.rows[0].username
				}
				res.status(200).send(response);
			} else {
				res.status(500).send(undefined);
			}
		})	
	} else if (req.body.type === "email") {
		res.status(200).send(response);
	} else if (req.body.type === "form") {
		response = {
			...response,
			templateID: process.env.TEMPLATE_FEEDBACK
		}
		res.status(200).send(response);
	}
})
	
module.exports = router;