import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string("Name must be a String").required("Name is Required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is Required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

export default schema;
