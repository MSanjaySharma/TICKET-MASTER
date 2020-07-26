const Ticket = require("../models/ticket");

module.exports.list = (req, res) => {
  Ticket.find({ userId: req.user._id })
    .populate("customer")
    .populate("department")
    .populate("employees")
    .then((tickets) => {
      res.json(tickets);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.show = (req, res) => {
  const id = req.params.id;
  Ticket.findOne({ userId: req.user._id, _id: id })
    .populate("customer")
    .populate("department")
    .populate("employees")
    .then((ticket) => {
      if (ticket) {
        res.json(ticket);
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
  const ticket = new Ticket(body);
  ticket.userId = req.user._id;
  ticket
    .save()
    .then((ticket) => {
      res.json(ticket);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.update = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Ticket.findOneAndUpdate({ userId: req.user._id, _id: id }, body, {
    new: true,
    runValidators: true,
  })
    .then((ticket) => {
      if (ticket) {
        res.json(ticket);
      } else {
        res.json({});
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.softDelete = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Ticket.findOneAndUpdate({ userId: req.user._id, _id: id }, body, {
    new: true,
    runValidators: true,
  })
    .then((ticket) => {
      if (ticket) {
        res.json(ticket);
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
  Ticket.findOneAndDelete({ userId: req.user._id, _id: id })
    .then((ticket) => {
      if (ticket) {
        res.json(ticket);
      } else {
        res.json({});
      }
    })
    .catch((err) => {
      res.json(err);
    });
};
