import React, { useState } from "react";
import { connect } from "react-redux";
import swal from "sweetalert";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import {
  startRemoveDepartment,
  startAddDepartment,
} from "../../actions/departments";

export const DepartmentList = (props) => {
  const { departments, history } = props;

  const [dept, setDept] = useState("");

  const handleChange = (e) => {
    setDept(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const redirect = () => history.push("/departments");
    props.dispatch(startAddDepartment({ name: dept }, redirect));
  };

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
        props.dispatch(startRemoveDepartment(id));
      }
    });
  };

  return (
    <>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={1}
        style={{ width: "80%", margin: "5vh auto" }}
      >
        <Grid item style={{ width: "100%" }}>
          <Typography variant="h5">
            Departments - {departments.length}
          </Typography>
        </Grid>

        {Boolean(departments.length) &&
          departments.map((department) => (
            <Grid key={department._id} item style={{ width: "100%" }}>
              <Paper>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  style={{ padding: "10px" }}
                >
                  <Grid item>
                    <Typography variant="h6" align="center">
                      {department.name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      color="primary"
                      variant="contained"
                      style={{ marginRight: "1vw" }}
                      onClick={() => {
                        history.push(`/departments/${department._id}`);
                      }}
                    >
                      show
                    </Button>
                    <Button
                      color="primary"
                      variant="contained"
                      style={{ marginRight: "1vw" }}
                      onClick={() => {
                        history.push(`/departments/edit/${department._id}`);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() => {
                        return handleRemove(department._id);
                      }}
                    >
                      remove
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}

        {!Boolean(departments.length) && (
          <>
            <Paper>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                style={{ padding: "10px" }}
              >
                NO DEPARTMENTS TO DISPLAY
              </Grid>
            </Paper>
          </>
        )}

        <Grid item style={{ width: "100%" }}>
          <Typography variant="h6">Add Department</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              required
              id="department"
              name="department"
              label="Department"
              fullWidth
              value={dept}
              onChange={handleChange}
              style={{ marginTop: "5px" }}
            />
            <Button
              style={{ marginTop: "5px" }}
              variant="contained"
              color="primary"
              type="submit"
            >
              Add
            </Button>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => ({ departments: state.departments });

export default connect(mapStateToProps)(DepartmentList);
