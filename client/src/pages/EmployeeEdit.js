import React from "react";

import EmployeeEditComp from "../components/employee/EmployeeEdit";

function EmployeeEdit({ match, history }) {
  return (
    <>
      <EmployeeEditComp employeeId={match.params.id} history={history} />
    </>
  );
}

export default EmployeeEdit;
