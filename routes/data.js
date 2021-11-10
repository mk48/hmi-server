var express = require("express");
const fs = require("fs");
const path = require("path");
var router = express.Router();

let PLCdata = [];

const filePath = path.join(__dirname, "../data/plcdata.json");

loadData();

router.get("/", function (req, res, next) {
  res.json(PLCdata);
});

router.post("/", function (req, res) {
  const updateRequest = req.body;
  const tagValueToUpdate = PLCdata.find((d) => d.name === updateRequest.name);
  if (tagValueToUpdate && tagValueToUpdate.name) {
    tagValueToUpdate.val = updateRequest.val;
  } else {
    //if tag not found, add it
    PLCdata.push(updateRequest);
  }
  saveData();
  res.json({ result: true });
});

function saveData() {
  const data = JSON.stringify(PLCdata);
  try {
    fs.writeFileSync(filePath, data, "utf8");
  } catch (exp) {
    console.error(exp);
  }
}

function loadData() {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    PLCdata = JSON.parse(data);
  } catch (exp) {
    console.error(exp);
  }
}

module.exports = router;
