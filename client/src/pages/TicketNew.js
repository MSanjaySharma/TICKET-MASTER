import React from "react";

import TicketForm from "../components/ticket/TicketForm";

function TicketNew({ history }) {
  return (
    <>
      <TicketForm history={history} />
    </>
  );
}

export default TicketNew;
