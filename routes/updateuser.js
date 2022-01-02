const { Router } = require('express');
const pool = require('../config/db');

const router = Router();

router.put('/updateuser', (req, res) => {
    pool.query(`UPDATE users 
    SET username='${req.body.new_user}', email='${req.body.new_email}' 
    WHERE username='${req.body.old_user}' RETURNING username, password, usertype;`, (error, results) => {
        if (error) {
            res.status(500).send(error);
        }
        res.status((results !== undefined) ? 200 : 500).send((results !== undefined) ? results.rows[0] : undefined);
    });
});

module.exports = router;