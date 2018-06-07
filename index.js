const express        = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const mongoose       = require('mongoose');
const session        = require('express-session');
mongoose.Promise = require('bluebird');


const { port, dbURI } = require('./config/environment');

mongoose.connect(dbURI);

const router         = require('./config/router');
const app            = express();
const User           = require('./models/user');

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(expressLayouts);



app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'ssh it\'s a secret',
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  if(!req.session.userId) return next();
  User
    .findById(req.session.userId)
    .populate({path: 'pictures', populate: {path: 'creator'}})
    .exec()
    .then((user) =>{
      res.locals.user = user;
      res.locals.isLoggedIn = true;

      req.user = user;

      next();
    });
});

app.get('/', (req, res) => res.render('pictures/home'));

app.use(methodOverride((req)=>{
  if(req.body && typeof req.body === 'object' && '_method' in req.body){
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(router);
app.listen(port, () => console.log('listening on port 4000'));
