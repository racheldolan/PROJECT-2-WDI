const express        = require('express');
const app            = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser     = require('body-parser');
const router         = require('./config/router');
const methodOverride = require('method-override');
const mongoose       = require('mongoose');

mongoose.connect('mongodb://localhost:4000');


app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(expressLayouts);


app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.render('pictures/home'));

app.use(methodOverride((req)=>{
  if(req.body && typeof req.body === 'object' && '_method' in req.body){
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(router);
app.listen(4000, () => console.log('listening on port 4000'));
