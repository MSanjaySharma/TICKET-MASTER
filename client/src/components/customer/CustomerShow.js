import React from "react";
import { connect } from "react-redux";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Typography, Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const Cards = ({ tickets }) => {
  return (
    <>
      {Boolean(tickets.length) && (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          {tickets.map((ticket) => (
            <Grid key={ticket._id} item style={{ width: "100%" }} xs={4}>
              <Card
                style={
                  ticket.isResolved
                    ? { background: "#00e676" }
                    : { background: "#f44336" }
                }
                variant="outlined"
              >
                <CardContent>
                  <Typography align="center">{`Code No: ${ticket.code}`}</Typography>
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
    </>
  );
};

const CustomerShow = ({ tickets, customer }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Paper style={{ maxWidth: "80vw", margin: "5vh auto" }}>
        <Grid
          container
          spacing={3}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12} style={{ width: "100%" }}>
            <Typography
              align="center"
              variant="h5"
            >{`${customer?.name} - ${customer?.email}`}</Typography>
          </Grid>
          <Grid item xs={12} style={{ width: "100%" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="All" />
              <Tab label="Pending" />
              <Tab label="Completed" />
            </Tabs>
          </Grid>
          <Grid item style={{ width: "95%" }}>
            {value === 0 && <Cards tickets={tickets} />}
            {value === 1 && (
              <Cards tickets={tickets.filter((tick) => !tick.isResolved)} />
            )}
            {value === 2 && (
              <Cards tickets={tickets.filter((tick) => tick.isResolved)} />
            )}
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerShow);
