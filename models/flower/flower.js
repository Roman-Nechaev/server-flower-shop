const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../../helpers");

const emailRegexp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

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
    reviews: [
      {
        author: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          match: emailRegexp,
          required: [true, "Email is required"],
          unique: true,
        },
        content: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
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

const reviewSchema = Joi.object({
  author: Joi.string().required(),
  content: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp, "user@example.com").required(),
  rating: Joi.number().integer().min(1).max(5).required(),
});

const updateSaleSchema = Joi.object({
  sale: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateNewSchema,
  updateSaleSchema,
  reviewSchema,
};

flowerSchema.post("save", handleMongooseError);

const Flower = model("flower", flowerSchema);

module.exports = {
  Flower,
  schemas,
};
