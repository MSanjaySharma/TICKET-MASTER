# TICKET MASTER

Ticket Master is a full-Stack, help-desk utility to register, track and analyse customer complaints.

### 🛠 Tech Stack - (MERN)

- A Single Page application communicates with a REST API built over MVC architecture.
- 💻 JavaScript | ES6
- 🌐 ReactJS | Node.js | Express.js | MongoDB
- 🔧 Git | Markdown
- 📦 [Material-UI](https://github.com/mui-org/material-ui), [bcrypt.js](https://www.npmjs.com/package/bcryptjs), [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken), [mongoose](https://www.npmjs.com/package/mongoose), [redux](https://github.com/reduxjs/redux), [react-router-dom](https://www.npmjs.com/package/react-router-dom), [sweetalert](https://sweetalert.js.org/), [validator](https://www.npmjs.com/package/validator), [axios](https://www.npmjs.com/package/axios), [Formik](https://github.com/formium/formik), [react-google-charts](https://www.npmjs.com/package/react-google-charts), [redux-thunk](https://github.com/reduxjs/redux-thunk), [yup](https://github.com/jquense/yup), [redux-persist](https://github.com/rt2zz/redux-persist)

---

### DEMO

![TICKET MASTER DEMO](https://user-images.githubusercontent.com/68370514/88466533-fec1bc00-ceea-11ea-8066-3208464d56a1.gif)

Open the [LIVE DEMO](https://ticket-master.onrender.com/) to try Ticket Master yourself.

Disclaimer: There could be delay in responses due as the app is hosted on shared community servers (non-production grade servers).

---

### Features

- Authentication.
  - User must signup and signin to verify their identity to use the application.
  - Bcryptjs and JWT used for authentication.
  - Route guarding is implemented as React HOC's.
- Dark Mode
  - Dark Mode implemented using the materialUI theming.
- Customers Module
  - Authenticated users can perform CRUD operations on customers.
  - Tickets related to individual customers can be sorted based on completion.
- Departments Module
  - Authenticated users can perform CRUD operations on departments.
  - Sort tickets related to individual departments as completed and not completed.
- Employees Module
  - Authenticated users can perform CRUD operations on employees.
- Ticketing Module
  - Authenticated users can perform CRUD operations on Tickets.
  - Dynamic selection of employee for the ticket based on particular selection of department.
  - implementation of dynamic select using materialUI autocomplete and nested checkbox.
- visualization of Data
  - Ticketing data are showcased to the user as Pie and Bar charts
  - Use of react google charts for visualization

### Contributors

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://github.com/MSanjaySharma"><img src="https://avatars3.githubusercontent.com/u/65958268?s=40" alt="M Sanjay Sharma" /></a></br>
[M Sanjay Sharma](https://github.com/MSanjaySharma)

### License

[![license](https://img.shields.io/badge/license-MIT-green?style=flat-square)](https://github.com/MSanjaySharma/TICKET-MASTER/blob/master/LICENSE)
