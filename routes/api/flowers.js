const express = require("express");

const ctrl = require("../../controllers");
const {
  validateBody,
  isValidId,
  authenticate,
  uploadFile,
} = require("../../middlewares");

const { schemas } = require("../../models/flower/flower");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", isValidId, ctrl.getById);

router.post("/add", authenticate, uploadFile(), ctrl.add);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateById
);

router.patch(
  "/:id/new",
  authenticate,
  isValidId,
  validateBody(schemas.updateNewSchema),
  ctrl.updateNewId
);

router.patch(
  "/:id/sale",
  authenticate,
  isValidId,
  validateBody(schemas.updateSaleSchema),
  ctrl.updateSaleId
);

router.delete("/:id", authenticate, isValidId, ctrl.deleteById);

//  добавления и удаления товаров из корзины

module.exports = router;
