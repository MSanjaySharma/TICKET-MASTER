import React from "react";

import CustomerEditComp from "../components/customer/CustomerEdit";

function CustomerEdit({ match, history }) {
  return (
    <>
      <CustomerEditComp customerId={match.params.id} history={history} />
    </>
  );
}

export default CustomerEdit;
