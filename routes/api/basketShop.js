const express = require("express");

const ctrl = require("../../controllers/basket");

const { validateBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/basket");

const router = express.Router();

router.get("/all", authenticate, ctrl.getAllOrders);

router.post("/add", validateBody(schemas.basketValidSchema), ctrl.addProduct);

module.exports = router;
