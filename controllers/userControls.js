const User = require('../models/user');
const uuidv4 = require('uuid/v4');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const register = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const passConfirm = req.body.passConfirm;

  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('passConfirm', 'Passwords must match').equals(req.body.password);
  
  const errors = req.validationErrors();

  if(errors) {
    res.status(400).json({
      error: errors
    });
    return;
  }

  let newUser = new User({
    name: name,
    email: email,
    username: username,
    password: password
  });

  const matchUsername = await User.findOne({ 'username': newUser.username});
  
  if(matchUsername) {
    res.status(409).json({
      error: `Username ${newUser.username} is already taken.`
    });
    return;
  }

  const matchEmail = await User.findOne({ 'email': newUser.email});

  if(matchEmail) {
    res.status(409).json({
      error: `A user with email ${newUser.email} is already registered.`
    });
    return;
  }

  await User.newUser(newUser, (err, user) => {
    if(err) {
      res.status(424).json({
        error: err
      });
      return;
    }
  })

  res.status(201).json({
      user: newUser
    });
}

passport.use(new LocalStrategy((username, password, done) => {
  console.log(User);
   User.getUserByUsername(username, (err, user) => {
    console.log('here uerr');
    if(err) throw err;
    if(!user) {
      return done(null, false, {error: 'Unknown User'});
    }

     User.comparePassword(password, user.password, (err, match) => {
      console.log('here perr');
      if(err) throw err;
      if(match) {
        return done(null, user);
      } else {
        return done(null, false, {error: 'Invalid password'});
      }
    });

  });
}))

passport.serializeUser(async (user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  User.getUserById(id, async (err, user) => {
    done(err, user);
  });
});

const login = (req, res) => {
  console.log('in login');
  const username = req.body.username;
  res.status(201).json({
      login: 'success',
      username: username
    });
};

module.exports = {
  register,
  login
};