const { Flower } = require("../models/flower/flower");

const { HttpError, CtrlWrapper, imgHandler } = require("../helpers");
const { DEFAULT_IMG } = require("../constants/constants");

const getAll = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Flower.find({}, "-createdAt -updatedAt", {
    skip,
    limit,
  });

  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Flower.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const add = async (req, res) => {
  let newLinkToImage = [];

  const { files = [], body: reqBody } = req;

  if (files) {
    newLinkToImage = await imgHandler(files);
  } else {
    newLinkToImage = DEFAULT_IMG;
  }

  const newFlower = { ...reqBody, pictures: newLinkToImage };

  const result = await Flower.create({ ...newFlower });

  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Flower.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json(result);
};

const updateNewId = async (req, res) => {
  const { id } = req.params;
  const result = await Flower.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json(result);
};

const updateSaleId = async (req, res) => {
  const { id } = req.params;
  const result = await Flower.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Flower.findByIdAndRemove(id);
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
  updateNewId: CtrlWrapper(updateNewId),
  updateSaleId: CtrlWrapper(updateSaleId),
  deleteById: CtrlWrapper(deleteById),
};
