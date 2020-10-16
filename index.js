const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const middlewares = require('./middlewares');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
	cors({
		credentials: true,
		origin: process.env.FRONTEND_URI,
	})
);
app.use(morgan('dev'));

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at PORT ${port}`));
