import React from "react";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

function Copyright() {
  return (
    <Typography align="center" variant="body2" color="textSecondary">
      {"Copyright © "}
      TicketMaster
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "60vh",
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
  emptyClass: {},
}));

export default function StickyFooter({ modified }) {
  const classes = useStyles();

  return (
    <div
      className={!modified ? classes.root : classes.emptyClass}
      style={
        modified && {
          display: "flex",
          flexDirection: "column",
          minHeight: modified,
        }
      }
    >
      <CssBaseline />
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography align="center" variant="body1">
            Made with{" "}
            <span role="img" aria-label="image">
              ❤️
            </span>{" "}
            from Team TicketMaster .
          </Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}
