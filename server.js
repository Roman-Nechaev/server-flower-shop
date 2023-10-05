const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST, PORT = 6060 } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 6060");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// g8VKnvUfGMemkA1q;
