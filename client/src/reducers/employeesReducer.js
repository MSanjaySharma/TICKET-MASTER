const employeesReducer = (state = [], action) => {
  const initialState = [];
  switch (action.type) {
    case "SET_EMPLOYEES":
      return [].concat((state=initialState), action.payload);

    case "REMOVE_EMPLOYEE":
      return state.filter((employee) => {
        return employee._id !== action.payload._id;
      });

    case "ADD_EMPLOYEE":
      return [...state, action.payload];

    case "UPDATE_EMPLOYEE_DEPARTMENT": {
      return state.map((employee) => {
        if (employee.department._id === action.payload._id) {
          employee.department = action.payload._id;
          return { ...employee };
        } else {
          return { ...employee };
        }
      });
    }

    case "EDIT_EMPLOYEE":
      return state.map((employee) => {
        if (employee._id === action.payload._id) {
          return Object.assign({}, employee, action.payload);
        } else {
          return Object.assign({}, employee);
        }
      });
    case "PURGE_EMPLOYEES": {
        return [];
      }
    default:
      return state;
  }
};

export default employeesReducer;
