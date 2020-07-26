import axios from '../config/axios'

import swal from 'sweetalert'

export const setTickets = (ticket) => {
    return {
        type: 'SET_TICKETS',
        payload: ticket
    }
}

export const startSetTickets = () => {
    return (dispatch) => {
        axios.get('/apiv1/tickets',{
                    headers: {
                        'x-auth': localStorage.getItem('authToken')
                    }
                })
            .then(response=>{
                const tickets = response.data
                dispatch(setTickets(tickets))
            })
            .catch(err=>{
                console.log(err)
            })

    }
}

export const removeTicket = (ticket) => {
    return {
        type: 'REMOVE_TICKET',
        payload: ticket
    }
}

export const startRemoveTicket = (id) => {
    return (dispatch) => {
        axios.delete(`/apiv1/tickets/${id}`,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const ticket = response.data
            dispatch(removeTicket(ticket))
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

export const addTicket = (ticket) => {
    return {
        type: 'ADD_TICKET',
        payload: ticket
    }
}

export const startAddTicket = (ticket,redirect) => {
    return (dispatch) => {
        axios.post('/apiv1/tickets',ticket,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            if(response.data.errors){
                swal(`${response.data.message}`,"","error")
            } else {
                const ticket = response.data
                
                dispatch(addTicket(ticket))
                redirect()
            }
        })
    }
}

export const editTicket = (ticket) => {
    return {
        type: 'EDIT_TICKET',
        payload: ticket
    }
}

export const startEditTicket = (ticket,redirect) => {
    return(dispatch) => {
        axios.put(`/apiv1/tickets/${ticket.id}`,ticket,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            if (response.data.errors) {
                swal(`${response.data.message}`,"","error")
            } else {
                const ticket = response.data
                redirect()
                dispatch(editTicket(ticket))
            }
        })
    }
}

export const toggleTask = (ticket) => {
    return {
        type: 'TOGGLE_TASK',
        payload: ticket
    }
}

export const startToggleTask = (id,isResolved) => {
    return(dispatch) => {
        axios.put(`/apiv1/tickets/${id}`,{isResolved:!isResolved},{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            dispatch(toggleTask(id))
        
    }
}

export const searchTicket = (search) => {
    return {
        type: 'SEARCH_TICKET',
        payload: search
    }
}

export const updateTicketCustomer = (customer) => {
    return {
        type: 'UPDATE_TICKET_CUSTOMER',
        payload: customer
    }
}

export const updateTicketDepartment = (department) => {
    return {
        type: 'UPDATE_TICKET_DEPARTMENT',
        payload: department
    }
}