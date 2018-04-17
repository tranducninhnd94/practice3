var express = require('express');
var router = express.Router();

var ContentDAO = require("../dao/content.dao");
var contentDAO = new ContentDAO();

/* GET home page. */
router.post('/content/create', function (req, res, next) {
    contentDAO.insert(
        {
            topic: "reminder",
            user_say: "Chào bạn, tên bạn là gì",
            answer: [
                "minh tên  A",
                "rất vui"
            ],
            lang: "vi",
            updatetime: Date.now()
        }
    ).then(result => {
        res.status(200);
        res.json(result);
    }, error => {
        next();
    })
});

router.delete('/content/delete', function (req, res, next) {

});

router.put('/content/edit', function (req, res, next) {

});

router.get('/content/list', function (req, res, next) {
    contentDAO.findAll().then(result => {
        res.status(200);
        res.json(result);
    }, error => {
        next();
    })
});

module.exports = router;
