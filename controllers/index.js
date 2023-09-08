const flowers = require("../models/flowers");

const { HttpError, CtrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const result = await flowers.getAllFlower();

  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await flowers.getFlowersById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await flowers.addFlower(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await flowers.updateFlower(id, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await flowers.deleteFlowerId(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json(result);
};

module.exports = {
  getAll: CtrlWrapper(getAll),
  getById: CtrlWrapper(getById),
  add: CtrlWrapper(add),
  updateById: CtrlWrapper(updateById),
  deleteById: CtrlWrapper(deleteById),
};
