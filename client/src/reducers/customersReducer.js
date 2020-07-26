const customersReducer = (state = [], action) => {
  const initialState = [];
  switch (action.type) {
    case "SET_CUSTOMERS":
      return [].concat((state = initialState), action.payload);

    case "REMOVE_CUSTOMER":
      return state.filter((customer) => {
        return customer._id !== action.payload._id;
      });

    case "ADD_CUSTOMER":
      return [...state, action.payload];

    case "EDIT_CUSTOMER":
      return state.map((customer) => {
        if (customer._id === action.payload._id) {
          return Object.assign({}, customer, action.payload);
        } else {
          return Object.assign({}, customer);
        }
      });
    case "PURGE_CUSTOMERS": {
      return initialState
    }
    default:
      return state;
  }
};

export default customersReducer;
