var express = require("express");
var router = express.Router();

var ContentDAO = require("../dao/content.dao");
var contentDAO = new ContentDAO();

/* GET home page. */
router.post("/content/create", function(req, res, next) {
  console.log("body :", req.body);
  contentDAO.insert(req.body).then(
    result => {
      res.status(200);
      res.json(result);
    },
    error => {
      next();
    }
  );
});

router.delete("/content/delete", function(req, res, next) {
  let id = req.query.id;
  console.log("_id :", id);
  contentDAO.remove(id).then(
    result => {
      res.status(200);
      res.json(result);
    },
    error => {
      next();
    }
  );
});

router.put("/content/update", function(req, res, next) {
  let contentId = req.query.contentId;
  let body = req.body;
  contentDAO.edit(body, contentId).then(
    result => {
      res.status(200);
      res.json(result);
    },
    error => {
      next();
    }
  );
});

router.get("/content/list", function(req, res, next) {
  contentDAO.findAll().then(
    result => {
      res.status(200);
      res.json(result);
    },
    error => {
      next();
    }
  );
});

module.exports = router;
