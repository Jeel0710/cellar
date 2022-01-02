const { Router } = require('express');
const pool = require('../config/db');

const router = Router();

router.post('/promo', (req, res) => {
    pool.query(`SELECT * FROM promo WHERE name = '${req.body.promo}';`, (error, results) => {
        if (error) {
            res.status(500).send(error);
        }
        res.status((results !== undefined) ? 200 : 500).send((results !== undefined) ? results.rows[0] : undefined);
    });
});

module.exports = router;