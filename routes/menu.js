const { Router } = require("express");
const pool = require("../config/db");
const { v4: uuidv4 } = require('uuid');

const router = Router();

router.get('/menu', (req, res) => {
    pool.query(`SELECT item_id, item_name, item_description, item_price, shop_name, shop_owner 
    FROM menu
    INNER JOIN shops
    ON item_shopid = shop_id;`, (error, results) => {
        if (error) {
            res.status(500).send(error);
        }
        res.status((results === undefined) ? 500 : 200).send((results === undefined) ? undefined : results.rows);
    });
});

router.post('/menu', (req, res) => {
    pool.query(`SELECT shop_id
    FROM shops
    WHERE shop_owner = '${req.body.user}';`, (error, results) => {
        if (error) {
            res.status(500).send(error);
        }
        if (results !== undefined) {
            const item_shopid = results.rows[0].shop_id;
            const item_id = uuidv4();
            pool.query(`INSERT INTO menu (item_id, item_name, item_price, item_description, item_shopid)
            VALUES ('${item_id}','${req.body.item_name}', ${req.body.item_price}, '${req.body.item_description}', '${item_shopid}')
            RETURNING item_name;`, (err, result) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.status((result !== undefined) ? 200 : 500).send((result !== undefined) ? result.rows[0] : undefined);
            });
        } else {
            res.status(500).send(undefined);
        }
    });
})

router.delete('/menu', (req, res) => {
    pool.query(`DELETE FROM menu 
    WHERE item_id=${req.body.item_id} 
    RETURNING item_id;`, (error, results) => {
        if (error) {
            res.status(500).send(error);
        }
        res.status((results === undefined) ? 500 : 200).send((results === undefined) ? false : true);
    })
})

module.exports = router;