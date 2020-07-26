import React from "react";

import EmployeeForm from "../components/employee/EmployeeForm";

function EmployeeNew({ history }) {
  return (
    <>
      <EmployeeForm history={history} />
    </>
  );
}

export default EmployeeNew;
