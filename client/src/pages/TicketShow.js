import React from "react";
import { connect } from "react-redux";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const Cards = ({ tickets }) => {
  return (
    <div style={{ margin: "20vh" }}>
      {Boolean(tickets.length) && (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Typography
            variant="h4"
            align="center"
          >{`Ticket Code: ${tickets[0].code}`}</Typography>

          {tickets.map((ticket) => (
            <Grid key={ticket.id} item style={{ width: "100%" }} xs={4}>
              <Card
                style={
                  ticket.isResolved
                    ? { background: "#00e676" }
                    : { background: "#f44336" }
                }
                variant="outlined"
              >
                <CardContent>
                  <Typography align="center">{`Customer: ${ticket.customer.name}`}</Typography>
                  <Typography align="center">{`Employees: ${ticket.employees
                    .map((emp) => emp.name)
                    .toString()}`}</Typography>
                  <Typography align="center">{`Department: ${ticket.department.name}`}</Typography>
                  <Typography align="center">{`Message: ${ticket.message}`}</Typography>
                  <Typography align="center">{`Priority: ${ticket.priority}`}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {!Boolean(tickets.length) && (
        <Typography align="center" variant="h6">
          NO DATA TO DISPLAY
        </Typography>
      )}
    </div>
  );
};

function TicketShow({ ticket }) {
  return (
    <>
      <Cards tickets={ticket} />
    </>
  );
}

const mapStateToProps = (state, props) => ({
  ticket: state.tickets.filter((tick) => tick._id === props.match.params.id),
});

export default connect(mapStateToProps)(TicketShow);
