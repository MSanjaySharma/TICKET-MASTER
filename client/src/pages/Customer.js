import React, { useEffect } from "react";
import { connect } from "react-redux";

import CustomerTable from "../components/customer/CustomerTable";
import { startSetCustomers } from "../actions/customers";

function Customer(props) {
  useEffect(() => {
    props.dispatch(startSetCustomers());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CustomerTable history={props.history} />
    </>
  );
}

export default connect(null)(Customer);
