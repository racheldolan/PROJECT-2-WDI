const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');


app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(expressLayouts);

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => res.render('pages/home'));


app.listen(4000, () => console.log('listening on port 4000'));
