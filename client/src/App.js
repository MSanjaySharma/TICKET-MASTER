import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/layout/Header";
import StickyFooter from "./components/layout/Footer";
import { PrivateRoute } from "./utils/components/PrivateRoute";
import {
  Home,
  Customer,
  CustomerNew,
  CustomerEdit,
  CustomerShow,
  Department,
  DepartmentEdit,
  DepartmentShow,
  Employee,
  EmployeeNew,
  EmployeeEdit,
  EmployeeShow,
  Ticket,
  TicketNew,
  TicketEdit,
  TicketShow,
  Signin,
  Signup,
} from "./pages";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div style={{ height: "64px" }} />

        <Switch>
          <Route path="/" component={Home} exact={true} />
          <PrivateRoute path="/customers" component={Customer} exact={true} />
          <PrivateRoute path="/customers/new" component={CustomerNew} />
          <PrivateRoute path="/customers/edit/:id" component={CustomerEdit} />
          <PrivateRoute path="/customers/:id" component={CustomerShow} />
          <PrivateRoute
            path="/departments"
            component={Department}
            exact={true}
          />
          <PrivateRoute
            path="/departments/edit/:id"
            component={DepartmentEdit}
          />
          <PrivateRoute path="/departments/:id" component={DepartmentShow} />
          <PrivateRoute path="/employees" component={Employee} exact={true} />
          <PrivateRoute path="/employees/new" component={EmployeeNew} />
          <PrivateRoute path="/employees/edit/:id" component={EmployeeEdit} />
          <PrivateRoute path="/employees/:id" component={EmployeeShow} />
          <PrivateRoute path="/tickets" component={Ticket} exact={true} />
          <PrivateRoute path="/tickets/new" component={TicketNew} />
          <PrivateRoute path="/tickets/edit/:id" component={TicketEdit} />
          <PrivateRoute path="/tickets/:id" component={TicketShow} />
          <Route path="/signin" component={Signin} exact={true} />
          <Route path="/signup" component={Signup} exact={true} />
        </Switch>
        <StickyFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;
