const path = require("path");

module.exports = (req, res, next) => {
	try {
		const filepath = path.join(
			__dirname,
			"../uploads/avatars",
			req.params.user
		);
		res.sendFile(filepath);
	} catch (error) {
		res.status(404).json({ error });
	}
};
