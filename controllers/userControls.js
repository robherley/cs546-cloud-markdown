const User = require('../models/user');
const uuidv4 = require('uuid/v4');

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
    res.status(200).json({
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

  await User.newUser(newUser, (err, user) => {
    if(err) throw err;
      console.log(user);
  })

  res.status(200).json({
      test: 'register'
    });
}

module.exports = {
  register
};