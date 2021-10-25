var express = require("express");
const fs = require("fs");
const path = require("path");
var router = express.Router();

const filePath = path.join(__dirname, "../data/hmicomponent.json");

/* GET users listing. */
router.get("/", function (req, res, next) {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    res.json(JSON.parse(data));
  } catch (exp) {
    console.error(exp);
    res.json({ result: false });
  }
});

router.post("/", function (req, res) {
  const editorComponents = JSON.stringify(req.body);
  try {
    fs.writeFileSync(filePath, editorComponents, "utf8");
    res.json({ result: true });
  } catch (exp) {
    console.error(exp);
    res.json({ result: false });
  }
});

module.exports = router;
