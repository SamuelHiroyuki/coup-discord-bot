const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useFindAndModify: true,
	useUnifiedTopology: true,
	useCreateIndex: true
});
