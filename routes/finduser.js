const { Router } = require('express');
const pool = require('../config/db');

const router = Router();

router.post('/finduser', (req, res) => {
    pool.query(`SELECT username, usertype, email FROM users WHERE username LIKE '${req.body.search}%' AND '${req.body.search}' <> '';`, (error, results) => {
        if (error) {
            res.status(500).send(error);
        }
        res.status((results !== undefined) ? 200 : 500).send((results !== undefined) ? results.rows : undefined);
    });
});

module.exports = router;