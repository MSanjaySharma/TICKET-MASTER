import React from "react";
import { connect } from "react-redux";
import swal from "sweetalert";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { makeStyles } from "@material-ui/core/styles";

import { startRemoveTicket, startToggleTask } from "../../actions/tickets";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const columns = [
  { id: "code", label: "Code No.", minWidth: 70 },
  { id: "customer", label: "Customer", minWidth: 120 },
  { id: "department", label: "Department", minWidth: 120 },
  { id: "employees", label: "Employees", minWidth: 220 },
  { id: "message", label: "Message", minWidth: 220 },
  { id: "priority", label: "Priority", minWidth: 100 },
  { id: "actions", label: "Actions", minWidth: 270 },
];

const TicketTable = ({ tickets, history, dispatch }) => {
  //const { tickets, history } = props;
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRemove = (id) => {
    swal({
      title: "Confirm Deletion",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Successfully Deleted", {
          icon: "success",
        });
        dispatch(startRemoveTicket(id));
      }
    });
  };

  const handleToggle = (id, isResolved) => {
    dispatch(startToggleTask(id, isResolved));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Typography style={{ margin: "2vh" }} variant="h5" align="center">
        Tickets - {tickets.length}
      </Typography>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="center"
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {tickets.length ? (
            <TableBody>
              {tickets
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      {columns.map((column) => {
                        let value;
                        if (column.id === "actions") {
                          value = (
                            <>
                              <Tooltip arrow title="SHOW TICKET">
                                <IconButton
                                  color="primary"
                                  style={{ marginRight: "10px" }}
                                  onClick={() => {
                                    history.push(`/tickets/${row._id}`);
                                  }}
                                >
                                  <VisibilityIcon />
                                </IconButton>
                              </Tooltip>

                              <Tooltip arrow title="EDIT TICKET">
                                <IconButton
                                  color="primary"
                                  style={{ marginRight: "10px" }}
                                  onClick={() => {
                                    history.push(`/tickets/edit/${row._id}`);
                                  }}
                                >
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>

                              <Tooltip
                                arrow
                                title={
                                  row.isResolved
                                    ? "MARK TICKET AS NOT COMPLETE"
                                    : "MARK TICKET AS COMPLETED"
                                }
                              >
                                <IconButton
                                  color="primary"
                                  style={{ marginRight: "10px" }}
                                  onClick={() =>
                                    handleToggle(row._id, row.isResolved)
                                  }
                                >
                                  {row.isResolved ? (
                                    <CancelIcon />
                                  ) : (
                                    <CheckCircleIcon />
                                  )}
                                </IconButton>
                              </Tooltip>

                              <Tooltip arrow title="DELETE TICKET">
                                <IconButton
                                  color="secondary"
                                  onClick={() => handleRemove(row._id)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </>
                          );
                        } else if (column.id === "_id") {
                          value = index + 1;
                        } else if (
                          column.id === "department" ||
                          column.id === "customer"
                        ) {
                          value = row[column.id].name;
                        } else if (column.id === "employees") {
                          value = row[column.id]
                            .map((val) => val.name)
                            .toString();
                        } else {
                          value = row[column.id];
                        }
                        return (
                          <TableCell key={column.id} align="center">
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan="7">
                  <Typography align="center" style={{ margin: "2vh auto" }}>
                    NO DATA TO DISPLAY
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={tickets.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <Button
        onClick={() => {
          history.push(`/tickets/new`);
        }}
        style={{ margin: "2vh" }}
        color="primary"
        variant="contained"
      >
        ADD TICKET
      </Button>
    </>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(TicketTable);
