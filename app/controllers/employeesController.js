const Employee = require("../models/employee");

module.exports.list = (req, res) => {
  Employee.find({ userId: req.user._id })
    .populate("department")
    .then((employees) => {
      res.json(employees);
    });
};

module.exports.show = (req, res) => {
  const id = req.params.id;
  Employee.findOne({ userId: req.user._id, _id: id })
    .populate("department")
    .then((employee) => {
      if (employee) {
        res.json(employee);
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
  const employee = new Employee(body);
  employee.userId = req.user._id;
  employee
    .save()
    .then((employee) => {
      res.json(employee);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.update = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Employee.findOneAndUpdate({ userId: req.user._id, _id: id }, body, {
    new: true,
    runValidators: true,
  })
    .then((employee) => {
      if (employee) {
        res.json(employee);
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
  Employee.findOneAndDelete({ userId: req.user._id, _id: id })
    .then((employee) => {
      if (employee) {
        res.json(employee);
      } else {
        res.json({});
      }
    })
    .catch((err) => {
      res.json(err);
    });
};
