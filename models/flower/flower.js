const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../../helpers");

const flowerSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    sale: {
      type: Boolean,
      default: false,
    },
    new: {
      type: Boolean,
      default: true,
    },
    pictures: {
      type: [String],
      required: true,
    },
    // owner: {
    //   type: Schema.Types.ObjectId,
    //   ref: "user",
    //   required: true,
    // },
  },
  { versionKey: false, timestamps: true }
);

const addSchema = Joi.object({
  title: Joi.string().required(),
  price: Joi.number().required(),
  ingredients: Joi.array().items(Joi.string()).required(),
  text: Joi.string().required(),
  categories: Joi.array().items(Joi.string()).required(),
  tags: Joi.array().items(Joi.string()).required(),
  sale: Joi.boolean().default(false),
  new: Joi.boolean().default(true),
  pictures: Joi.array().items(Joi.string()).required(),
});

const updateNewSchema = Joi.object({
  new: Joi.boolean().required(),
});

const updateSaleSchema = Joi.object({
  sale: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateNewSchema,
  updateSaleSchema,
};

flowerSchema.post("save", handleMongooseError);

const Flower = model("flower", flowerSchema);

module.exports = {
  Flower,
  schemas,
};
