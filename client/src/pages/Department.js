import React, { useEffect } from "react";
import { connect } from "react-redux";

import DepartmentList from "../components/department/DepartmentList";
import { startSetDepartments } from "../actions/departments";

function Department(props) {
  useEffect(() => {
    props.dispatch(startSetDepartments());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <DepartmentList history={props.history} />
    </>
  );
}

export default connect(null)(Department);
