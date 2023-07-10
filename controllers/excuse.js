const Excuse = require("../models/Excuse");

exports.createExcuse = (req, res, next) => {
	const excuse = new Excuse({
		http_code: req.body.http_code,
		tag: req.body.tag,
		message: req.body.message,
	});

	excuse
		.save()
		.then(() => {
			res.status(201).json({
				message: "Post saved successfully!",
			});
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			});
		});
};

exports.getExcuse = (req, res) => {
	Excuse.findOne({ _id: req.params.id })
		.then((excuse) => {
			res.status(200).json(excuse);
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			});
		});
};

exports.getExcuses = (req, res) => {
	Excuse.find({ http_code: req.params.http_code })
		.then((excuses) => {
			res.status(200).json(excuses);
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			});
		});
};

exports.getAllExcuses = (req, res) => {
	Excuse.find({})
		.then((excuses) => {
			res.status(200).json(excuses);
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			});
		});
};
