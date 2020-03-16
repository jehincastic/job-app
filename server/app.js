const express = require("express"),
    bodyParser = require("body-parser"),
    path = require("path"),
    app = express();

const indexRoutes = require('./routes/index'),
	{ scheduler } = require("./schedulers/scheduler"),
	{ authFunction } = require("./controllers/middlewares");


require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));
app.use(authFunction)
  
app.get('*', function(req, res, next) {
	if (!req.path.includes('api')) {
		res.sendFile(path.join(__dirname, 'client/index.html'), err => {
			if (err) {
				res.status(500).send(err);
			}
		});
	} else {
		next();
	}
});
app.use('/api', indexRoutes);
app.use('/*', (req, res) => {
	res.status(404).send({
		status: 'FAILED',
		message: 'Not Found'
	});
});

app.listen(process.env.port, () => {
    console.log(`Server Started On Port ${process.env.port}`);
})