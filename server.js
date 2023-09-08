const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST =
  "mongodb+srv://admin:g8VKnvUfGMemkA1q@cluster0.fahvzgi.mongodb.net/flowers_base?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(6060, () => {
      console.log("Server running. Use our API on port: 6060");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// g8VKnvUfGMemkA1q;
