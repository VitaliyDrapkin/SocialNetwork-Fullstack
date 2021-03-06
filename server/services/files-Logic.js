const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./upload");
  },
  filename(req, file, cb) {
    cb(
      null,
      Date.now() + file.originalname.substr(file.originalname.length - 5)
    );
  },
});

const upload = multer({ storage: storage }).single("image");

async function uploadFile(request, response) {
  try {
    upload(request, response, function (error) {
      console.log(request.file);
      if (error instanceof multer.MulterError) {
        console.log(error);
        return;
      } else if (error) {
        console.log(error);
        return;
      } else {
        response.send({
          imgUrl: request.file.filename,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function deleteFile(fileName) {
  fs.unlink(`./upload/${fileName}`, (err) => {
    if (err) console.log(err);
  });
}

module.exports = { uploadFile, deleteFile };
