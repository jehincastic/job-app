const express = require("express"),
    bodyParser = require("body-parser"),
    path = require("path"),
    app = express();

const indexRoutes = require('./routes/index'),
	templateRoutes = require('./routes/template'),
	{ scheduler } = require("./schedulers/scheduler"),
	{ authFunction } = require("./controllers/middlewares");


require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

app.use(authFunction);
app.use(indexRoutes);
app.use('/template', templateRoutes);
app.use('/*', (req, res) => {
	res.status(404).send({
		status: 'FAILED',
		message: 'Not Found'
	});
});

app.listen(process.env.port, () => {
    console.log(`Server Started On Port ${process.env.port}`);
})