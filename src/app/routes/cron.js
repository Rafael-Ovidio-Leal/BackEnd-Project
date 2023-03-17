const router = require("express").Router();

const cronController = require("../controllers/cronController");

router.route("").get((req, res) => cronController.get(req, res));

module.exports = router;