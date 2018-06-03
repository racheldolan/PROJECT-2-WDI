
const express        = require('express');

const expressLayouts = require('express-ejs-layouts');
const bodyParser     = require('body-parser');

const methodOverride = require('method-override');
const mongoose       = require('mongoose');
const session        = require('express-session');
const databaseURI = 'mongodb://localhost/mongo-canvas';

mongoose.connect(databaseURI);

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
  console.log('session middleware')
  console.log(req.session)
  User
    .findById(req.session.userId)
    .populate({path: 'pictures', populate: {path: 'creator'}})
    .exec()
    .then((user) =>{
      res.locals.user = user;
      res.locals.isLoggedIn = true;
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
app.listen(4000, () => console.log('listening on port 4000'));
