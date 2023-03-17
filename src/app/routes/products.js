const router = require("express").Router();

const productsController = require("../controllers/productsController");

router.route("/").get((req, res) => productsController.get(req, res));
router.route("/:code").get((req, res) => productsController.getById(req, res));
router.route("/:code").put((req, res) => productsController.put(req, res));
router.route("/:code").delete((req, res) => productsController.delete(req, res));

module.exports = router;