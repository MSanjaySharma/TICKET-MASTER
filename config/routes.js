const express = require("express");
const router = express.Router();

const { aunthenticateUser } = require("../app/middlewares/authentication");

const usersController = require("../app/controllers/usersController");
const customersController = require("../app/controllers/customersController");
const departmentsController = require("../app/controllers/departmentsController");
const employeesController = require("../app/controllers/employeesController");
const ticketsController = require("../app/controllers/ticketsController");

router.post("/users/registration", usersController.register);
router.post("/users/login", usersController.login);
router.get("/users/account", aunthenticateUser, usersController.account);
router.delete("/users/logout", aunthenticateUser, usersController.logout);

router.get("/customers", aunthenticateUser, customersController.list);
router.get("/customers/:id", aunthenticateUser, customersController.show);
router.post("/customers", aunthenticateUser, customersController.create);
router.put("/customers/:id", aunthenticateUser, customersController.update);
router.delete("/customers/:id", aunthenticateUser, customersController.delete);

router.get("/departments", aunthenticateUser, departmentsController.list);
router.get("/departments/:id", aunthenticateUser, departmentsController.show);
router.post("/departments", aunthenticateUser, departmentsController.create);
router.put("/departments/:id", aunthenticateUser, departmentsController.update);
router.delete(
  "/departments/:id",
  aunthenticateUser,
  departmentsController.delete
);

router.get("/employees", aunthenticateUser, employeesController.list);
router.get("/employees/:id", aunthenticateUser, employeesController.show);
router.post("/employees", aunthenticateUser, employeesController.create);
router.put("/employees/:id", aunthenticateUser, employeesController.update);
router.delete("/employees/:id", aunthenticateUser, employeesController.delete);

router.get("/tickets", aunthenticateUser, ticketsController.list);
router.get("/tickets/:id", aunthenticateUser, ticketsController.show);
router.post("/tickets", aunthenticateUser, ticketsController.create);
router.put("/tickets/:id", aunthenticateUser, ticketsController.update);
router.delete(
  "/tickets/soft_delete/:id",
  aunthenticateUser,
  ticketsController.softDelete
);
router.delete("/tickets/:id", aunthenticateUser, ticketsController.delete);

module.exports = router;
