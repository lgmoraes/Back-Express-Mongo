const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const TEXT = {
	created: "Utilisateur créé !",
	addImage: "Image ajouté",
	wrongCredentials: "Paire login/mot de passe incorrecte",
	removeFileError: "Erreur lors de la suppression du fichier :",
};

exports.signup = (req, res, next) => {
	bcrypt
		.hash(req.body.password, 10)
		.then((hash) => {
			const user = new User({
				email: req.body.email,
				password: hash,
			});
			user
				.save()
				.then(() => res.status(201).json({ message: TEXT.created }))
				.catch((error) => res.status(400).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
	User.findOne({ email: req.body.email })
		.then((user) => {
			if (!user) {
				return res.status(401).json({ message: TEXT.wrongCredentials });
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid) {
						return res.status(401).json({ message: TEXT.wrongCredentials });
					}
					res.status(200).json({
						userId: user._id,
						token: jwt.sign(
							{ userId: user._id },
							process.env.JWT_TOKEN_SECRET,
							{
								expiresIn: "24h",
							}
						),
					});
				})
				.catch((error) => res.status(500).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.setAvatar = (req, res, next) => {
	const userId = req.auth.userId;

	User.findOne({ _id: userId }).then((user) => {
		if (!user.avatarFilename) return;

		const oldAvatar = path.resolve(
			__dirname,
			"../uploads/avatars",
			user.avatarFilename
		);

		fs.unlink(oldAvatar, (error) => {
			if (error) {
				console.error(TEXT.removeFileError, error);
			}
		});
	});

	User.updateOne(
		{ _id: userId },
		{
			avatarFilename: `${req.file.filename}`,
		}
	)
		.then((result) => {
			res.status(200).json({ message: result });
		})
		.catch((error) => res.status(500).json({ error }));
};
