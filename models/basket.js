const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

const basketSchema = new Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "flower",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    shippingAddress: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { versionKey: false, timestamps: true }
);

const basketValidSchema = Joi.object({
  customerName: Joi.string().required(),
  customerEmail: Joi.string()
    .pattern(emailRegexp, "user@example.com")
    .required(),
  products: Joi.array()
    .items(
      Joi.object({
        product: Joi.string().required(), // Здесь предполагается, что product будет строкой, представляющей ObjectId товара
        quantity: Joi.number().integer().min(1).required(),
        price: Joi.number().min(0).required(),
      })
    )
    .required(),
  shippingAddress: Joi.string().required(),
  totalAmount: Joi.number().min(0).required(),
  paymentMethod: Joi.string().required(),
  orderDate: Joi.date(),
  status: Joi.string().valid(
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled"
  ),
});

basketSchema.post("save", handleMongooseError);

const schemas = {
  basketValidSchema,
};

const Basket = model("basket", basketSchema);

module.exports = {
  Basket,
  schemas,
};
