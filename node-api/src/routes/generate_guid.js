var express = require("express");
var router = express.Router();
const uuidv4 = require("uuid/v4");

/* GET new guid. */
router.get("/", async function(req, res, next) {
  try {
    tracking_guid = await res.json(uuidv4());
  } catch (err) {
    return res.status(400).json(err);
  } finally {
    return tracking_guid;
  }
});

module.exports = router;
