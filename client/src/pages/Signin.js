import React from "react";

import SigninComp from "../components/authentication/signin/SiginComponentFormik";

function Signin({ history }) {
  return (
    <>
      <SigninComp history={history} />
    </>
  );
}

export default Signin;
