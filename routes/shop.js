const { Router } = require("express");
const pool = require("../config/db");
const { v4: uuidv4 } = require('uuid');
const e = require("express");

const router = Router();

router.post('/shop', (req, res) => {
    const shop_id = uuidv4();
    pool.query(`INSERT INTO shops (shop_id, shop_name, shop_owner)
            VALUES ('${shop_id}','${req.body.shop_name}', '${req.body.shop_owner}')
            RETURNING shop_name;`, (error, results) => {
        if (error) {
            res.status(500).send(error);
        }
        if (results !== undefined) {
            pool.query(`UPDATE users SET usertype = 1 WHERE username = '${req.body.shop_owner}';`, (err, result) => {
                if (err) {
                    res.status(500).send(error);
                }
                res.status((result !== undefined) ? 200 : 500).send((result !== undefined) ? results.rows[0] : undefined);
            });
        } else {
            res.status(500).send(undefined);
        }
    });
});

router.delete('/shop', (req, res) => {
    pool.query(`DELETE FROM shops
    WHERE shop_owner='${req.body.shop_owner}' 
    RETURNING shop_id;`, (error, results) => {
        if (error) {
            res.status(500).send(error);
        }
        if (results !== undefined) {
            pool.query(`UPDATE users SET usertype = 2 WHERE username = '${req.body.shop_owner}';`, (err, result) => {
                if (err) {
                    res.status(500).send(error);
                }
                res.status((result !== undefined) ? 200 : 500).send((result !== undefined) ? results.rows[0] : undefined);
            });
        } else {
            res.status(500).send(undefined);   
        }
    })
});

module.exports = router;