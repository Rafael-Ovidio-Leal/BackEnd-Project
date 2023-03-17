const router = require("express").Router();

const cronRoutes = require("./app/routes/cron");
const productsRoutes = require("./app/routes/products");

router.use("/", cronRoutes);
router.use("/products", productsRoutes);

module.exports = router;