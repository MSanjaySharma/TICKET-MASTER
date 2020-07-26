const Customer = require("../models/customer");

module.exports.list = (req, res) => {
  Customer.find({ userId: req.user._id }).then((customers) => {
    res.json(customers);
  });
};

module.exports.show = (req, res) => {
  const id = req.params.id;
  Customer.findOne({ userId: req.user._id, _id: id })
    .then((customer) => {
      if (customer) {
        res.json(customer);
      } else {
        res.json({});
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.create = (req, res) => {
  const body = req.body;
  const customer = new Customer({
    name: body.name,
    email: body.email,
    mobile: body.mobile,
  });
  customer.userId = req.user._id;
  customer
    .save()
    .then((customer) => {
      res.json(customer);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.update = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Customer.findOneAndUpdate({ userId: req.user._id, _id: id }, body, {
    new: true,
    runValidators: true,
  })
    .then((customer) => {
      if (customer) {
        res.json(customer);
      } else {
        res.json({});
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.delete = (req, res) => {
  const id = req.params.id;
  Customer.findOneAndDelete({ userId: req.user._id, _id: id })
    .then((customer) => {
      if (customer) {
        res.json(customer);
      } else {
        res.json({});
      }
    })
    .catch((err) => {
      res.json(err);
    });
};
