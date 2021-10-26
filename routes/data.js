var express = require("express");
var router = express.Router();

let dt = { tag1: 20, tag2: 5, tag3: 200, tagcolor1: "red", tagcolor2: "blue" };

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json(dt);
});

router.post("/", function (req, res) {
  dt = { ...dt, ...req.body };
  res.json({ result: true });
});

module.exports = router;
