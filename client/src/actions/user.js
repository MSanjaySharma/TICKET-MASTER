import axios from "../config/axios";
import swal from "sweetalert";

export const setUser = (user) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};

export const removeUser = () => {
  return {
    type: "REMOVE_USER",
  };
};

export const startSetUser = (loginData, redirect) => {
  return (dispatch) => {
    axios.post("/apiv1/users/login", loginData).then((response) => {
      if (response.data.hasOwnProperty("errors")) {
        swal(`${response.data.errors}`, "", "error");
      } else {
        swal("Successfully Logged In!", "", "success");
        localStorage.setItem("authToken", response.data.token);
        dispatch(setUser(response.data.user));
        redirect();
      }
    });
  };
};

export const startAddUser = (registerData, redirect) => {
  return (dispatch) => {
    axios.post("/apiv1/users/registration", registerData).then((response) => {
      if (response.data.errors) {
        swal(`${response.data.message}`, "", "error");
      } else {
        swal("Successfully Registered!", "", "success");
        redirect();
        dispatch(setUser(response.data.user));
      }
    });
  };
};

export const startRemoveUser = () => {
  return (dispatch) => {
    axios
      .delete("/apiv1/users/logout", {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        if (response.data.errors) {
          alert(response.data.message);
        } else {
          dispatch({ type: "PURGE_USER" });
          dispatch({ type: "PURGE_CUSTOMERS" });
          dispatch({ type: "PURGE_DEPARTMENTS" });
          dispatch({ type: "PURGE_TICKETS" });
          dispatch({ type: "PURGE_EMPLOYEES" });
          localStorage.clear();
          //window.location.replace("http://localhost:3000/signin");
          window.location.replace(
            "https://ticket--master.herokuapp.com/signin"
          );
        }
      });
  };
};
