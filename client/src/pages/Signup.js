import React from "react";

import SignupComp from "../components/authentication/signup/SignupComponentFormik";

function Signup({ history }) {
  return (
    <>
      <SignupComp history={history} />
    </>
  );
}

export default Signup;
