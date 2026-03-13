// const multer = require('multer')
// const path = require('path')

// // Multer COnfig
// module.exports = multer({
//     storage: multer.diskStorage({}),
//     fileFilter: (req, file, cb) => {
//         let ext = path.extname(file.originalname);
//         if (ext !== ".jpg" && ext !== ".JPG" && ext !== ".jpeg" && ext !== ".JPEG" && ext !== ".png" && ext !== ".PNG") {
//             cb(new Error("File type is not supported"), false);
//             return;
//         }
//         cb(null, true);
//     }
// })

const multer = require("multer")
const path = require("path")

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/")
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

// File filter
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase()

  if (ext !== ".jpg" && ext !== ".JPG" && ext !== ".jpeg" && ext !== ".JPEG" && ext !== ".png" && ext !== ".PNG") {
    return cb(new Error("Only .jpg, .jpeg and .png files are allowed"), false)
  }

  cb(null, true)
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
})

module.exports = upload