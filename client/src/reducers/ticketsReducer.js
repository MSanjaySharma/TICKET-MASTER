const ticketsReducer = (state = [], action) => {
  const initialState = [];
  switch (action.type) {
    case "SET_TICKETS":
      return [].concat((state = initialState), action.payload);

    case "REMOVE_TICKET":
      return state.filter((ticket) => {
        return ticket._id !== action.payload._id;
      });

    case "ADD_TICKET":
      return [...state, action.payload];

    case "EDIT_TICKET":
      return state.map((ticket) => {
        if (ticket._id === action.payload._id) {
          return Object.assign({}, ticket, action.payload);
        } else {
          return Object.assign({}, ticket);
        }
      });
    case "TOGGLE_TASK":
      return state.map((ticket) => {
        if (ticket._id === action.payload) {
          ticket.isResolved = !ticket.isResolved;
          return ticket;
        } else {
          return ticket;
        }
      });

    case "UPDATE_TICKET_CUSTOMER": {
      return state.map((ticket) => {
        if (ticket.customer._id === action.payload._id) {
          ticket.customer = action.payload._id;
          return { ...ticket };
        } else {
          return { ...ticket };
        }
      });
    }

    case "UPDATE_TICKET_DEPARTMENT": {
      return state.map((ticket) => {
        if (ticket.department._id === action.payload._id) {
          ticket.department = action.payload._id;
          return { ...ticket };
        } else {
          return { ...ticket };
        }
      });
    }

    case "FILTER_SEARCH":
      return state.filter((ticket) => ticket.code.includes(action.payload));

    case "PURGE_TICKETS": {
      return [];
    }

    default:
      return state;
  }
};

export default ticketsReducer;
