import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "../config/axios";

import CustomerShowComp from "../components/customer/CustomerShow";

function CustomerShow(props) {
  const [ticketsUser, setTickets] = useState([]);

  useEffect(() => {
    const id = props.match.params.id;
    axios
      .get(`/apiv1/customers/${id}`, {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        const customer = response.data;
        axios
          .get("/apiv1/tickets", {
            headers: {
              "x-auth": localStorage.getItem("authToken"),
            },
          })
          .then((response) => {
            const allTickets = response.data;
            const tickets = allTickets.filter(
              (ticket) => ticket.customer._id === customer._id
            );

            setTickets(tickets);
          });
      })
      .catch((err) => console.log(err));

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CustomerShowComp tickets={ticketsUser} customer={props.customer} />
    </>
  );
}

const mapStateToProps = (state, props) => ({
  customer: state.customers.filter(
    (cust) => cust._id === props.match.params.id
  )[0],
});

export default connect(mapStateToProps)(CustomerShow);
