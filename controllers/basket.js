const { Basket } = require("../models/basket");

const { CtrlWrapper, HttpError } = require("../helpers");

const getAllOrders = async (req, res) => {
  const result = await Basket.find({}, "-createdAt -updatedAt", {});

  res.json(result);
};

const addProduct = async (req, res) => {
  const { body } = req;
  console.log("body", body);
  if (!body) {
    throw HttpError(409, "чтото почшо не так");
  }
  const result = await Basket.create({ ...body });

  res.status(201).json(result);
};

module.exports = {
  addProduct: CtrlWrapper(addProduct),
  getAllOrders: CtrlWrapper(getAllOrders),
};
