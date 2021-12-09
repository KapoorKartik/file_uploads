const path = require("path")
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, "../uploads"))
    // console.log("inside pathvala")
  },
  filename: function (req, file, callback) {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    callback(null, `${uniquePrefix}-${file.originalname}`)
    // console.log("inside filename")
  }
})

const fileFilter = (req, file, callback) => {

  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    callback(null, true)
    // console.log(file)
    // console.log("inside file.mimetype")
  } else {
    callback(null, false)
  }
}

module.exports = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
})