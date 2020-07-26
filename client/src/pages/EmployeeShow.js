import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "../config/axios";

import EmployeeShowComp from "../components/employee/EmployeeShow";

function EmployeeShow(props) {
  const [ticketsUser, setTickets] = useState([]);

  useEffect(() => {
    const id = props.match.params.id;
    axios
      .get(`/apiv1/employees/${id}`, {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        const employee = response.data;
        axios
          .get("/apiv1/tickets", {
            headers: {
              "x-auth": localStorage.getItem("authToken"),
            },
          })
          .then((response) => {
            const allTickets = response.data;
            const tickets = allTickets.filter((ticket) =>
              Boolean(
                ticket.employees.filter((emp) => emp._id === employee._id)
                  .length
              )
            );

            setTickets(tickets);
          });
      })
      .catch((err) => console.log(err));

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <EmployeeShowComp
        tickets={ticketsUser}
        employee={props.employee}
        history={props.history}
      />
    </>
  );
}

const mapStateToProps = (state, props) => ({
  employee: state.employees.filter(
    (emp) => emp._id === props.match.params.id
  )[0],
});

export default connect(mapStateToProps)(EmployeeShow);
