const HttpError = require("./HttpError");
const fs = require("fs").promises;

const cloudinary = require("cloudinary").v2;

const imgHandler = async (file) => {
  const imageUrls = [];

  const { CLOUDE_NAME, API_KEY, API_SECRET } = process.env;

  cloudinary.config({
    cloud_name: CLOUDE_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
  });

  for (const { path } of file) {
    const uploadOptions = {
      width: 182,
      height: 182,
      gravity: "auto",
      crop: "fill",
    };
    await cloudinary.uploader.upload(path, uploadOptions, (error, result) => {
      if (error) {
        HttpError(400, "Uploads error");
      } else {
        imageUrls.push(result.url);
        console.log("The file has been successfully uploaded to Cloudinary:");
      }
    });
    await fs.unlink(path);
  }

  return imageUrls;
};

module.exports = imgHandler;
