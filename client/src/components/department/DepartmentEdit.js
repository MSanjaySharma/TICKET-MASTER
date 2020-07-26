import React, { useState } from "react";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { startEditDepartment } from "../../actions/departments";

export const DepartmentEdit = ({ department, history, dispatch }) => {
  const [dept, setDept] = useState(department.name);

  const handleChange = (e) => {
    setDept(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const redirect = () => history.push("/departments");
    dispatch(
      startEditDepartment({ name: dept, id: department?._id }, redirect)
    );
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
          <Typography variant="h6">Edit Department</Typography>
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
              Submit
            </Button>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state, props) => ({
  department: state.departments.filter(
    (dept) => dept._id === props.departmentId
  )[0],
});

export default connect(mapStateToProps)(DepartmentEdit);
