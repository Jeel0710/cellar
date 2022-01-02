const { Router } = require('express');
const pool = require('../config/db');
const bcryptjs = require('bcryptjs');

const router = Router();

router.post('/signup', async (req, res) => {
    const hashpwd = await bcryptjs.hash(req.body.pwd, 10);
    pool.query(`INSERT INTO users (username, password, email) VALUES ('${req.body.user}','${hashpwd}','${req.body.email}') RETURNING username;`, (error, results) => {
        if (error) {
            res.status(500).send(error);
        }
        res.status((results !== undefined) ? 200 : 500).send((results !== undefined) ? results.rows[0] : undefined);
    });
})

module.exports = router;