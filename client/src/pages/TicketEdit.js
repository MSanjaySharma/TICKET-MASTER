import React from "react";

import TicketEditComp from "../components/ticket/TicketEdit";

function TicketEdit({ match, history }) {
  return (
    <>
      <TicketEditComp ticketId={match.params.id} history={history} />
    </>
  );
}

export default TicketEdit;
