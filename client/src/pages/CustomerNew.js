import React from "react";

import CustomerForm from "../components/customer/CustomerForm";

function CustomerNew({ history }) {
  return (
    <>
      <CustomerForm history={history} />
    </>
  );
}

export default CustomerNew;
