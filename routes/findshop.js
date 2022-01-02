const { Router } = require('express');
const pool = require('../config/db');

const router = Router();

router.post('/findshop', (req, res) => {
    pool.query(`SELECT shop_name, shop_owner FROM shops WHERE shop_name LIKE '${req.body.search}%' and '${req.body.search}'<>'';`, (error, results) => {
        if (error) {
            res.status(500).send(error);
        }
        res.status((results !== undefined) ? 200 : 500).send((results !== undefined) ? results.rows : undefined);
    });
});

module.exports = router;