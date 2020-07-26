import React from "react";
import { connect } from "react-redux";
import swal from "sweetalert";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import { startRemoveEmployee } from "../../actions/employees";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const columns = [
  { id: "_id", label: "ID", minWidth: 70 },
  { id: "name", label: "Name", minWidth: 180 },
  { id: "email", label: "Email", minWidth: 180 },
  { id: "mobile", label: "Mobile", minWidth: 90 },
  { id: "department", label: "Department", minWidth: 170 },
  { id: "actions", label: "Actions", minWidth: 200 },
  { id: "remove", label: "Remove", minWidth: 170 },
];

const EmployeeTable = (props) => {
  const { employees, history } = props;
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
        props.dispatch(startRemoveEmployee(id));
      }
    });
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
      <Paper
        style={{ maxWidth: "80vw", margin: "5vh auto" }}
        className={classes.root}
      >
        <Typography style={{ margin: "2vh" }} variant="h5" align="center">
          EMPLOYEES - {employees.length}
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
            {employees.length ? (
              <TableBody>
                {employees
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row._id}
                      >
                        {columns.map((column) => {
                          let value;
                          if (column.id === "actions") {
                            value = (
                              <>
                                <Button
                                  color="primary"
                                  variant="contained"
                                  style={{ marginRight: "1vw" }}
                                  onClick={() => {
                                    history.push(`/employees/${row._id}`);
                                  }}
                                >
                                  show
                                </Button>
                                <Button
                                  color="primary"
                                  variant="contained"
                                  onClick={() => {
                                    history.push(`/employees/edit/${row._id}`);
                                  }}
                                >
                                  Edit
                                </Button>
                              </>
                            );
                          } else if (column.id === "remove") {
                            value = (
                              <Button
                                color="secondary"
                                variant="contained"
                                onClick={() => {
                                  return handleRemove(row._id);
                                }}
                              >
                                remove
                              </Button>
                            );
                          } else if (column.id === "_id") {
                            value = index + 1;
                          } else if (column.id === "department") {
                            value = row[column.id].name;
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
          count={employees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        <Button
          onClick={() => {
            history.push(`/employees/new`);
          }}
          style={{ margin: "2vh" }}
          color="primary"
          variant="contained"
        >
          ADD EMPLOYEE
        </Button>
      </Paper>
    </>
  );
};

const mapStateToProps = (state) => ({ employees: state.employees });

export default connect(mapStateToProps)(EmployeeTable);
