const express = require('express');
const os = require('os');
const router = express.Router();
const db = require('../dbconnection')
 
router.get('/api/getUsername', (req, res, next) => {
    res.send({ username: os.userInfo().username });
});

router.get('/getData', (req, res) => {
    db.query("select * from images", (err, rows) => {
        if (!err) {
        res.send({data: rows});
        } else {
        res.send(err);
        }
        });
    }
)

router.post('/postData/:param1', (req, res) => {
    console.log(req.param.param1);
}
);
     
module.exports = router;