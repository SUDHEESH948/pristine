const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedImages = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  const allowedVideos = [
    "video/mp4",
    "video/webm",
    "video/mov",
    "video/quicktime",
  ];

  if (
    allowedImages.includes(file.mimetype) ||
    allowedVideos.includes(file.mimetype)
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only JPG, PNG, WEBP images and MP4, WEBM, MOV videos are allowed"
      )
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

module.exports = upload;