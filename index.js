const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const router = require('./config/router');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:4000');


app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(expressLayouts);

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => res.render('pictures/home'));

app.use(router);
app.listen(4000, () => console.log('listening on port 4000'));
