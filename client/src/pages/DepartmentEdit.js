import React from "react";

import DepartmentEditComp from "../components/department/DepartmentEdit";

function DepartmentEdit({ match, history }) {
  return (
    <>
      <DepartmentEditComp departmentId={match.params.id} history={history} />
    </>
  );
}

export default DepartmentEdit;
