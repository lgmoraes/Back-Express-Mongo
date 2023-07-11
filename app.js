const express = require("express");
const mongoose = require("mongoose");
const excuseRoutes = require("./routes/excuse");

require("dotenv").config();

const Excuse = require("./models/Excuse");

mongoose
	.connect(process.env.CONNECTION_STRING, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connexion à MongoDB réussie !"))
	.catch(() =>
		console.log(
			consoleColors.red + "Connexion à MongoDB échouée !" + consoleColors.reset
		)
	);

const app = express();
app.use(express.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	);
	next();
});

app.use("/api/excuses", excuseRoutes);

module.exports = app;
