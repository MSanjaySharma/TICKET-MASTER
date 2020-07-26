import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import useStyles from "./useStyles";
import { startSetUser } from "../../../actions/user";

import schema from "./schema";

const initialValues = {
  email: "",
  password: "",
};

export class SigninComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
    };
  }

  handleClickShowPassword = () => {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };

  handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  redirect = () => {
    return this.props.history.push("/");
  };

  handleSubmit = (values) => {
    const formData = {
      email: values.email,
      password: values.password,
    };
    this.props.dispatch(startSetUser(formData, this.redirect));
  };

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Formik
            initialValues={initialValues}
            onSubmit={(values) => this.handleSubmit(values)}
            validationSchema={schema}
          >
            {({ setFieldValue, setFieldTouched, values, errors, touched }) => (
              <Form className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      helperText={<ErrorMessage name="email"></ErrorMessage>}
                      error={touched.email && Boolean(errors.email)}
                      as={TextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type={this.state.showPassword ? "text" : "password"}
                      id="password"
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={this.handleClickShowPassword}
                            onMouseDown={this.handleMouseDownPassword}
                          >
                            {this.state.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        ),
                      }}
                      helperText={<ErrorMessage name="password"></ErrorMessage>}
                      error={touched.password && Boolean(errors.password)}
                      as={TextField}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <div className={classes.linkDiv}>
                  <Link style={{ textDecoration: "none" }} to="/signup">
                    <Typography color="primary" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Typography>
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(withStyles(useStyles)(SigninComponent));
