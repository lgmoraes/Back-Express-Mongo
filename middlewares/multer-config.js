const multer = require("multer");
const { removeFileExtension } = require("./../utils/functions");

const MIME_TYPES = {
	"image/jpg": "jpg",
	"image/jpeg": "jpg",
	"image/png": "png",
};

const storageAvatar = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "uploads/avatars");
	},
	filename: (req, file, callback) => {
		const name = removeFileExtension(file.originalname).split(" ").join("_");
		const extension = MIME_TYPES[file.mimetype];
		callback(null, name + Date.now() + "." + extension);
	},
});

module.exports = multer({ storage: storageAvatar }).single("avatar");
