const multer = require("multer");
const path = require("path");
const { CtrlWrapper, HttpError } = require("../helpers");

const uploadFile = () => {
  const tempDir = path.join(__dirname, "../", "temp");
  const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, tempDir);
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + ".jpg");
    },
  });

  const multerFilter = CtrlWrapper(async (req, file, cb) => {
    if (file.mimetype.startsWith("image/jpeg")) {
      cb(null, true);
    } else {
      cb(HttpError(400, "Please, upload images only!"), false);
    }
  });

  const fileSizeLimit = { fileSize: 3 * 1024 * 1024 };

  return multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: {
      ...fileSizeLimit,
    },
  }).array("pictures", 5);
};

module.exports = uploadFile;
