// application user model

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  password: { type: String },
  github: {
    id:         { type: Number, unique: true, sparse: true },
    profileUrl: { type: String },
    avatarUrl:  { type: String }
  }
});

userSchema.pre('save', function(next) {
  const user = this;

  // validate user has some type of auth id
  if (user.password || (user.github && user.github.id)) {
    next();
  } else {
    const err = new Error('User must have an authentication identifier');
    next(err);
  }
});

userSchema.methods.toUserResponse = function() {
  return {
    id: this.id,
    name: this.name,
    github: {
      profileUrl: this.github.profileUrl,
      avatarUrl: this.github.avatarUrl
    }
  };
}

module.exports = mongoose.model('User', userSchema);
