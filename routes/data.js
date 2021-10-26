var express = require("express");
var router = express.Router();

let PLCdata = [
  { name: "motor1.temperature", type: "analog", val: 80, unit: "F" },
  { name: "motor1.speed", type: "analog", val: 20, unit: "RPM" },
  { name: "motor1.state", type: "digital", val: 1 },
  { name: "belt1.speed", type: "analog", val: 0.5, unit: "m/sec" },
  { name: "belt1.state", type: "digital", val: 0 },
];

router.get("/", function (req, res, next) {
  res.json(PLCdata);
});

router.post("/", function (req, res) {
  const updateRequest = req.body;
  const tagValueToUpdate = PLCdata.find((d) => d.name === updateRequest.name);
  if (tagValueToUpdate && tagValueToUpdate.name) {
    tagValueToUpdate.val = updateRequest.val;
    res.json({ result: true });
  } else {
    res.json({ result: false });
  }
});

module.exports = router;
