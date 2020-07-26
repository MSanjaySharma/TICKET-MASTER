import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "../config/axios";

import DepartmentShowComp from "../components/department/DepartmentShow";

function DepartmentShow(props) {
  const [ticketsUser, setTickets] = useState([]);

  useEffect(() => {
    const id = props.match.params.id;
    axios
      .get(`/apiv1/departments/${id}`, {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        const department = response.data;
        axios
          .get("/apiv1/tickets", {
            headers: {
              "x-auth": localStorage.getItem("authToken"),
            },
          })
          .then((response) => {
            const allTickets = response.data;
            const tickets = allTickets.filter(
              (ticket) => ticket.department._id === department._id
            );

            setTickets(tickets);
          });
      })
      .catch((err) => console.log(err));

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <DepartmentShowComp tickets={ticketsUser} department={props.department} />
    </>
  );
}

const mapStateToProps = (state, props) => ({
  department: state.departments.filter(
    (dept) => dept._id === props.match.params.id
  )[0],
});

export default connect(mapStateToProps)(DepartmentShow);
