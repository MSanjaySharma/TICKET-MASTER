const User = require("../models/user");

const authenticateUser = (req, res, next) => {
  const token = req.header("x-auth");
  User.findByToken(token)
    .then((user) => {
      if (user) {
        req.user = user;
        req.token = token;
        next();
      } else {
        res.status("401").json({ notice: "token not available" });
      }
    })
    .catch((err) => {
      res.status("401").json(err);
    });
};

module.exports = {
  authenticateUser,
};
