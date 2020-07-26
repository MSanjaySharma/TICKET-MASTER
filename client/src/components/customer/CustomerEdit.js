import React from "react";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";
import { startEditCustomer } from "../../actions/customers";

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

const CustomerEdit = ({ customer, history, dispatch }) => {
  const classes = useStyles();
  const initialValues = {
    name: customer?.name,
    email: customer?.email,
    mobile: customer?.mobile,
  };

  const handleSubmit = (values) => {
    const formData = {
      name: values.name,
      email: values.email,
      mobile: values.mobile,
      id: customer?._id,
    };
    const redirect = () => history.push("/customers");
    dispatch(startEditCustomer(formData, redirect));
  };

  return (
    <>
      <CssBaseline />
      {customer && (
        <div className={classes.root}>
          <Container maxWidth="sm" className={classes.container}>
            <Typography
              style={{ textAlign: "center", marginTop: "5vh" }}
              variant="h6"
              gutterBottom
            >
              EDIT CUSTOMER
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
      {!customer && (
        <Typography align="center" varinant="h5">
          NO SUCH CUSTOMER EXISTS. CHECK AGAIN !!!
        </Typography>
      )}
    </>
  );
};

const mapStateToProps = (state, props) => ({
  customer: state.customers.filter((cust) => cust._id === props.customerId)[0],
});

export default connect(mapStateToProps)(CustomerEdit);
