const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../app/middlewares/authentication");

const usersController = require("../app/controllers/usersController");
const customersController = require("../app/controllers/customersController");
const departmentsController = require("../app/controllers/departmentsController");
const employeesController = require("../app/controllers/employeesController");
const ticketsController = require("../app/controllers/ticketsController");

router.post("/users/registration", usersController.register);
router.post("/users/login", usersController.login);
router.get("/users/account", authenticateUser, usersController.account);
router.delete("/users/logout", authenticateUser, usersController.logout);

router.get("/customers", authenticateUser, customersController.list);
router.get("/customers/:id", authenticateUser, customersController.show);
router.post("/customers", authenticateUser, customersController.create);
router.put("/customers/:id", authenticateUser, customersController.update);
router.delete("/customers/:id", authenticateUser, customersController.delete);

router.get("/departments", authenticateUser, departmentsController.list);
router.get("/departments/:id", authenticateUser, departmentsController.show);
router.post("/departments", authenticateUser, departmentsController.create);
router.put("/departments/:id", authenticateUser, departmentsController.update);
router.delete(
  "/departments/:id",
  authenticateUser,
  departmentsController.delete
);

router.get("/employees", authenticateUser, employeesController.list);
router.get("/employees/:id", authenticateUser, employeesController.show);
router.post("/employees", authenticateUser, employeesController.create);
router.put("/employees/:id", authenticateUser, employeesController.update);
router.delete("/employees/:id", authenticateUser, employeesController.delete);

router.get("/tickets", authenticateUser, ticketsController.list);
router.get("/tickets/:id", authenticateUser, ticketsController.show);
router.post("/tickets", authenticateUser, ticketsController.create);
router.put("/tickets/:id", authenticateUser, ticketsController.update);
router.delete(
  "/tickets/soft_delete/:id",
  authenticateUser,
  ticketsController.softDelete
);
router.delete("/tickets/:id", authenticateUser, ticketsController.delete);

module.exports = router;
