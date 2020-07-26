import React, { useState } from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

import { startAddTicket } from "../../actions/tickets";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const schema = Yup.object().shape({
  code: Yup.number("Code must be a number").required("Code is Required"),
  message: Yup.string("Enter valid message").required("Message is Required"),
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

const initialValues = {
  code: "",
  message: "",
};

const TicketForm = ({
  dispatch,
  history,
  customers,
  departments,
  employees,
}) => {
  const classes = useStyles();

  const [selectedDept, setDept] = useState("");

  const [formEmp, setEmp] = useState([]);

  const [radio, setRadio] = useState("high");

  const handleChange = (e) => {
    setDept(e.target.value);
  };

  const handleChangeRadio = (e) => {
    setRadio(e.target.value);
  };

  const selectedEmp = employees.filter(
    (emp) => emp.department._id === selectedDept
  );

  const handleSubmit = (values) => {
    const formData = {
      code: values.code,
      customer: values.customer,
      department: selectedDept,
      employees: formEmp,
      message: values.message,
      priority: radio,
    };

    const redirect = () => history.push("/tickets");
    dispatch(startAddTicket(formData, redirect));
  };

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <Container maxWidth="sm" className={classes.container}>
          <Typography
            style={{ textAlign: "center", marginTop: "5vh" }}
            variant="h6"
            gutterBottom
          >
            ADD NEW TICKET
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
            validationSchema={schema}
          >
            {({ setFieldValue, setFieldTouched, values, errors, touched }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Field
                      variant="outlined"
                      required
                      id="code"
                      name="code"
                      label="Code"
                      fullWidth
                      helperText={<ErrorMessage name="code"></ErrorMessage>}
                      error={touched.name && Boolean(errors.name)}
                      as={TextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      variant="outlined"
                      required
                      select
                      id="customer"
                      name="customer"
                      label="Customer"
                      SelectProps={{ native: true }}
                      fullWidth
                      helperText={<ErrorMessage name="customer"></ErrorMessage>}
                      error={touched.mobile && Boolean(errors.mobile)}
                      as={TextField}
                    >
                      <option aria-label="None" value="" />
                      {customers.map((cust) => (
                        <option key={cust._id} value={cust._id}>
                          {cust.name.toUpperCase()}
                        </option>
                      ))}
                    </Field>
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
                      onChange={handleChange}
                      fullWidth
                      helperText={
                        <ErrorMessage name="department"></ErrorMessage>
                      }
                      error={touched.department && Boolean(errors.department)}
                      as={TextField}
                    >
                      <option aria-label="None" value="" />
                      {departments.map((dept) => (
                        <option key={dept._id} value={dept._id}>
                          {dept.name.toUpperCase()}
                        </option>
                      ))}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      id="employees"
                      name="employees"
                      label="Employees"
                      multiple
                      onChange={(e, value) => {
                        setEmp(value.map((val) => val._id));
                      }}
                      options={selectedEmp}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.name}
                      renderOption={(option, { selected }) => (
                        <React.Fragment>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.name}
                        </React.Fragment>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Employees"
                          placeholder="Employees"
                        />
                      )}
                      as={Autocomplete}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      variant="outlined"
                      multiline
                      rows={3}
                      required
                      id="message"
                      name="message"
                      label="Message"
                      fullWidth
                      helperText={<ErrorMessage name="mobile"></ErrorMessage>}
                      error={touched.mobile && Boolean(errors.mobile)}
                      as={TextField}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormLabel component="legend">Priority</FormLabel>
                    <Field
                      required
                      id="priority"
                      name="priority"
                      label="Priority"
                      row
                      onChange={handleChangeRadio}
                      value={radio}
                      error={touched.mobile && Boolean(errors.mobile)}
                      as={RadioGroup}
                    >
                      <FormControlLabel
                        value="high"
                        control={<Radio style={{ color: "#ab003c" }} />}
                        label="High"
                      />
                      <FormControlLabel
                        value="medium"
                        control={<Radio style={{ color: "#ff3d00" }} />}
                        label="Medium"
                      />
                      <FormControlLabel
                        value="low"
                        control={<Radio style={{ color: "#ffea00" }} />}
                        label="Low"
                      />
                    </Field>
                  </Grid>

                  <Grid className={classes.button} item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      ADD TICKET
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Container>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  departments: state.departments,
  customers: state.customers,
  employees: state.employees,
});

export default connect(mapStateToProps)(TicketForm);
