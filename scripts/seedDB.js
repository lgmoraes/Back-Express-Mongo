const mongoose = require("mongoose");
const Excuse = require("../models/Excuse");

require("dotenv").config();

mongoose
	.connect(process.env.CONNECTION_STRING, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connexion à MongoDB réussie !");

		seedDB()
			.then(() => {
				mongoose.connection.close();
				console.log("Hydratation terminée !");
			})
			.catch((e) => console.log(e));
	})
	.catch((e) => {
		console.log("Connexion à MongoDB échouée !", e);
	});

seedExcuses = [
	{ http_code: 701, tag: "Inexcusable", message: "Meh" },
	{ http_code: 702, tag: "Inexcusable", message: "Emacs" },
	{ http_code: 703, tag: "Inexcusable", message: "Explosion" },
	{ http_code: 704, tag: "Inexcusable", message: "GotoFail" },
	{
		http_code: 705,
		tag: "Inexcusable",
		message:
			"Iwrotethecodeandmissedthenecessaryvalidationbyanoversight(see795)",
	},
	{ http_code: 706, tag: "Inexcusable", message: "DeleteYourAccount" },
	{ http_code: 707, tag: "Inexcusable", message: "Can'tquitvi" },
	{ http_code: 710, tag: "NoveltyImplementations", message: "PHP" },
	{
		http_code: 711,
		tag: "NoveltyImplementations",
		message: "ConvenienceStore",
	},
	{ http_code: 712, tag: "NoveltyImplementations", message: "NoSQL" },
	{ http_code: 718, tag: "NoveltyImplementations", message: "Iamnotateapot" },
	{ http_code: 719, tag: "NoveltyImplementations", message: "Haskell" },
	{ http_code: 720, tag: "EdgeCases", message: "Unpossible" },
	{ http_code: 721, tag: "EdgeCases", message: "KnownUnknowns" },
	{ http_code: 722, tag: "EdgeCases", message: "UnknownUnknowns" },
	{ http_code: 723, tag: "EdgeCases", message: "Tricky" },
	{ http_code: 724, tag: "EdgeCases", message: "Thislineshouldbeunreachable" },
	{ http_code: 725, tag: "EdgeCases", message: "Itworksonmymachine" },
	{ http_code: 726, tag: "EdgeCases", message: "It'safeature,notabug" },
	{ http_code: 727, tag: "EdgeCases", message: "32bitsisplenty" },
	{ http_code: 728, tag: "EdgeCases", message: "Itworksinmytimezone" },
	{ http_code: 730, tag: "Fucking", message: "Fuckingnpm" },
	{ http_code: 731, tag: "Fucking", message: "FuckingRubygems" },
	{ http_code: 732, tag: "Fucking", message: "FuckingUnic💩de" },
	{ http_code: 733, tag: "Fucking", message: "FuckingDeadlocks" },
	{ http_code: 734, tag: "Fucking", message: "FuckingDeferreds" },
	{ http_code: 736, tag: "Fucking", message: "FuckingRaceConditions" },
	{ http_code: 735, tag: "Fucking", message: "FuckingIE" },
	{ http_code: 737, tag: "Fucking", message: "FuckThreadsing" },
	{ http_code: 738, tag: "Fucking", message: "FuckingExactly-onceDelivery" },
	{ http_code: 739, tag: "Fucking", message: "FuckingWindows" },
	{ http_code: 738, tag: "Fucking", message: "FuckingExactly" },
	{ http_code: 739, tag: "Fucking", message: "FuckingMcAfee" },
	{ http_code: 750, tag: "SyntaxErrors", message: "Didn'tbothertocompileit" },
	{ http_code: 753, tag: "SyntaxErrors", message: "SyntaxError" },
	{ http_code: 754, tag: "SyntaxErrors", message: "Toomanysemi-colons" },
	{ http_code: 755, tag: "SyntaxErrors", message: "Notenoughsemi-colons" },
	{ http_code: 756, tag: "SyntaxErrors", message: "Insufficientlypolite" },
	{ http_code: 757, tag: "SyntaxErrors", message: "Excessivelypolite" },
	{
		http_code: 759,
		tag: "SyntaxErrors",
		message: "Unexpected`T_PAAMAYIM_NEKUDOTAYIM`",
	},
	{ http_code: 761, tag: "Substance", message: "Hungover" },
	{ http_code: 762, tag: "Substance", message: "Stoned" },
	{ http_code: 763, tag: "Substance", message: "Under-Caffeinated" },
	{ http_code: 764, tag: "Substance", message: "Over-Caffeinated" },
	{ http_code: 765, tag: "Substance", message: "Railscamp" },
	{ http_code: 766, tag: "Substance", message: "Sober" },
	{ http_code: 767, tag: "Substance", message: "Drunk" },
	{
		http_code: 768,
		tag: "Substance",
		message:
			"AccidentallyTookSleepingPillsInsteadOfMigrainePillsDuringCrunchWeek",
	},
	{ http_code: 771, tag: "PredictableProblems", message: "Cachedfortoolong" },
	{
		http_code: 772,
		tag: "PredictableProblems",
		message: "Notcachedlongenough",
	},
	{ http_code: 773, tag: "PredictableProblems", message: "Notcachedatall" },
	{ http_code: 774, tag: "PredictableProblems", message: "Whywasthiscached?" },
	{ http_code: 775, tag: "PredictableProblems", message: "Outofcash" },
	{
		http_code: 776,
		tag: "PredictableProblems",
		message: "ErrorontheException",
	},
	{ http_code: 777, tag: "PredictableProblems", message: "Coincidence" },
	{ http_code: 778, tag: "PredictableProblems", message: "OffByOneError" },
	{
		http_code: 779,
		tag: "PredictableProblems",
		message: "OffByTooManyToCountError",
	},
	{
		http_code: 780,
		tag: "SomebodyElse'sProblem",
		message: "Projectownernotresponding",
	},
	{ http_code: 781, tag: "SomebodyElse'sProblem", message: "Operations" },
	{ http_code: 782, tag: "SomebodyElse'sProblem", message: "QA" },
	{
		http_code: 783,
		tag: "SomebodyElse'sProblem",
		message: "Itwasacustomerrequest,honestly",
	},
	{
		http_code: 784,
		tag: "SomebodyElse'sProblem",
		message: "Management,obviously",
	},
	{
		http_code: 785,
		tag: "SomebodyElse'sProblem",
		message: "TPSCoverSheetnotattached",
	},
	{ http_code: 786, tag: "SomebodyElse'sProblem", message: "Tryitnow" },
	{
		http_code: 787,
		tag: "SomebodyElse'sProblem",
		message: "FurtherFundingRequired",
	},
	{
		http_code: 788,
		tag: "SomebodyElse'sProblem",
		message: "Designer'sfinaldesignsweren't",
	},
	{ http_code: 789, tag: "SomebodyElse'sProblem", message: "Notmydepartment" },
	{
		http_code: 791,
		tag: "Internetcrashed",
		message: "TheInternetshutdownduetocopyrightrestrictions",
	},
	{
		http_code: 792,
		tag: "Internetcrashed",
		message: "Climatechangedrivencatastrophicweatherevent",
	},
	{ http_code: 793, tag: "Internetcrashed", message: "ZombieApocalypse" },
	{ http_code: 794, tag: "Internetcrashed", message: "SomeoneletPGnearaREPL" },
	{ http_code: 795, tag: "Internetcrashed", message: "#heartbleed(see705)" },
	{ http_code: 796, tag: "Internetcrashed", message: "SomeDNSfuckeryidno" },
	{
		http_code: 797,
		tag: "Internetcrashed",
		message: "ThisisthelastpageoftheInternet.Goback",
	},
	{
		http_code: 798,
		tag: "Internetcrashed",
		message: "Icheckedthedbbackupscupboardandthecupboardwasbare",
	},
	{ http_code: 799, tag: "Internetcrashed", message: "Endoftheworld" },
];

const seedDB = async () => {
	await Excuse.deleteMany({});
	await Excuse.insertMany(seedExcuses);
};
