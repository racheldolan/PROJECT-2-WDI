const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  profile: {type: String},
  location: {type: String},
  following: [{type: String}],
  followers: [{type: String}],
  bio: {type: String},
  website: {type: String},
  password: {type: String, required: true},
  post: [{type: mongoose.Schema.Types.ObjectId, ref: 'Picture' }]
}, {
  timestamps: true
});

userSchema.virtual('pictures', {
  ref: 'Picture',
  foreignField: 'creator',
  localField: '_id'
});

userSchema.methods.validatePassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

userSchema.pre('save', function(next){
  if(this.isModified('password')){
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation){
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function(next){
  if(this.isModified('password') && this._passwordConfirmation !== this.password){
    this.invalidate('password');
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
