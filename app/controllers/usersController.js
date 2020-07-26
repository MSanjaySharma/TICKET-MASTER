const User = require("../models/user");

module.exports.register = (req, res) => {
  const body = req.body;
  const user = new User(body);
  user
    .save()
    .then((user) => {
      const { _id, username, email } = user;
      res.json({ _id, username, email });
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.login = (req, res) => {
  const body = req.body;
  let user;
  User.findByCredentials(body.email, body.password)
    .then((userFound) => {
      user = userFound;
      return user.generateToken();
    })
    .then((token) => {
      user = { _id: user._id, username: user.username, email: user.email };
      res.json({
        token,
        user,
      });
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.account = (req, res) => {
  const { _id, username, email } = req.user;
  res.json({ _id, username, email });
};

module.exports.logout = (req, res) => {
  const { user, token } = req;
  User.findByIdAndUpdate(user._id, { $pull: { tokens: { token: token } } })
    .then(() => {
      res.json({ notice: "successfully logged out" });
    })
    .catch((err) => {
      res.json(err);
    });
};
