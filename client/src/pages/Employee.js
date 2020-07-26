import React, { useEffect } from "react";
import { connect } from "react-redux";

import EmployeeTable from "../components/employee/EmployeeTable";
import { startSetEmployees } from "../actions/employees";

function Employee(props) {
  useEffect(() => {
    props.dispatch(startSetEmployees());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <EmployeeTable history={props.history} />
    </>
  );
}

export default connect(null)(Employee);
