import React, { useEffect } from "react";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";

import Charts from "../components/ticket/Charts";
import TicketTable from "../components/ticket/TicketTable";
import { startSetCustomers } from "../actions/customers";
import { startSetDepartments } from "../actions/departments";
import { startSetEmployees } from "../actions/employees";
import { startSetTickets } from "../actions/tickets";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function Ticket(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    props.dispatch(startSetCustomers());
    props.dispatch(startSetDepartments());
    props.dispatch(startSetEmployees());
    props.dispatch(startSetTickets());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Paper style={{ maxWidth: "90vw", margin: "5vh auto" }}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item style={{ width: "100%" }}>
            <Paper className={classes.root}>
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="PENDING TICKETS" />
                <Tab label="COMPLETED TICKETS" />
                <Tab label="TICKET STATS" />
              </Tabs>
            </Paper>
          </Grid>
          <Grid item style={{ width: "100%" }}>
            {value === 0 && (
              <TicketTable
                tickets={props.pendingTickets}
                history={props.history}
              />
            )}

            {value === 1 && (
              <TicketTable
                tickets={props.completedTickets}
                history={props.history}
              />
            )}

            {value === 2 && <Charts />}
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

const mapStateToProps = (state) => ({
  pendingTickets: state.tickets.filter((tick) => !tick.isResolved),
  completedTickets: state.tickets.filter((tick) => tick.isResolved),
});

export default connect(mapStateToProps)(Ticket);
