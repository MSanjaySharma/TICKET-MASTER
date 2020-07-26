const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...action.payload };
    case "REMOVE_USER":
      return {};
    case "PURGE_USER": {
      return {};
    }
    default:
      return state;
  }
};

export default userReducer;
