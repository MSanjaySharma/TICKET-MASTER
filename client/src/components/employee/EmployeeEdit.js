import React from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

import { startEditEmployee } from "../../actions/employees";

const schema = Yup.object().shape({
  name: Yup.string("Name must be a String").required("Name is Required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is Required"),
  mobile: Yup.string("Enter valid contact Number")
    .length(10, "Enter a 10 digit mobile number")
    .required("Mobile Number is Required"),
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    marginTop: theme.spacing(2),
  },
  top: {
    marginTop: theme.spacing(1),
  },
  button: {
    marginBottom: theme.spacing(2),
  },
}));

const EmployeeEdit = ({ employee, departments, history, dispatch }) => {
  const classes = useStyles();
  const initialValues = {
    name: employee?.name,
    email: employee?.email,
    mobile: employee?.mobile,
  };

  const handleSubmit = (values) => {
    const formData = {
      name: values.name,
      email: values.email,
      mobile: values.mobile,
      department: values.department,
      id: employee?._id,
    };
    const redirect = () => history.push("/employees");
    dispatch(startEditEmployee(formData, redirect));
  };

  return (
    <>
      <CssBaseline />
      {employee && (
        <div className={classes.root}>
          <Container maxWidth="sm" className={classes.container}>
            <Typography
              style={{ textAlign: "center", marginTop: "5vh" }}
              variant="h6"
              gutterBottom
            >
              EDIT EMPLOYEE
            </Typography>
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => handleSubmit(values)}
              validationSchema={schema}
            >
              {({
                setFieldValue,
                setFieldTouched,
                values,
                errors,
                touched,
              }) => (
                <Form>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Field
                        variant="outlined"
                        required
                        id="name"
                        name="name"
                        label="Name"
                        fullWidth
                        helperText={<ErrorMessage name="name"></ErrorMessage>}
                        error={touched.name && Boolean(errors.name)}
                        as={TextField}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        variant="outlined"
                        required
                        id="email"
                        name="email"
                        label="Email Address"
                        fullWidth
                        helperText={<ErrorMessage name="email"></ErrorMessage>}
                        error={touched.email && Boolean(errors.email)}
                        as={TextField}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        variant="outlined"
                        required
                        id="mobile"
                        name="mobile"
                        label="Mobile"
                        fullWidth
                        helperText={<ErrorMessage name="mobile"></ErrorMessage>}
                        error={touched.mobile && Boolean(errors.mobile)}
                        as={TextField}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        variant="outlined"
                        required
                        select
                        id="department"
                        name="department"
                        label="Department"
                        SelectProps={{ native: true }}
                        fullWidth
                        helperText={
                          <ErrorMessage name="department"></ErrorMessage>
                        }
                        error={touched.mobile && Boolean(errors.mobile)}
                        as={TextField}
                      >
                        <option value={employee?.department._id}>
                          {employee?.department.name.toUpperCase()}
                        </option>

                        {departments.map((dept) => {
                          if (dept._id !== employee?.department._id) {
                            return (
                              <option key={dept._id} value={dept._id}>
                                {dept.name.toUpperCase()}
                              </option>
                            );
                          }
                          return "";
                        })}
                      </Field>
                    </Grid>
                    <Grid className={classes.button} item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                      >
                        CONFIRM CHANGES
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Container>
        </div>
      )}
      {!employee && (
        <Typography align="center" varinant="h5">
          NO SUCH EMPLOYEE EXISTS. CHECK AGAIN !!!
        </Typography>
      )}
    </>
  );
};

const mapStateToProps = (state, props) => ({
  employee: state.employees.filter((emp) => emp._id === props.employeeId)[0],
  departments: state.departments,
});

export default connect(mapStateToProps)(EmployeeEdit);
