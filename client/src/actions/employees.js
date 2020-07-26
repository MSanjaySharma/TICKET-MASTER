import axios from '../config/axios'


import swal from 'sweetalert'

export const setEmployees = (employee) => {
    return {
        type: 'SET_EMPLOYEES',
        payload: employee
    }
}

export const startSetEmployees = () => {
    return (dispatch) => {
        axios.get('/apiv1/employees',{
                    headers: {
                        'x-auth': localStorage.getItem('authToken')
                    }
                })
            .then(response=>{
                const employees = response.data
                dispatch(setEmployees(employees))
            })
            .catch(err=>{
                console.log(err)
            })

    }
}

export const removeEmployee = (employee) => {
    return {
        type: 'REMOVE_EMPLOYEE',
        payload: employee
    }
}

export const startRemoveEmployee = (id) => {
    return (dispatch) => {
        axios.delete(`/apiv1/employees/${id}`,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const employee = response.data
            dispatch(removeEmployee(employee))
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

export const addEmployee = (employee) => {
    return {
        type: 'ADD_EMPLOYEE',
        payload: employee
    }
}

export const startAddEmployee = (employee,redirect) => {
    return (dispatch) => {
        axios.post('/apiv1/employees',employee,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            if(response.data.errors){
                swal(`${response.data.message}`,"","error")
            } else {
                const employee = response.data
                redirect()
                dispatch(addEmployee(employee))
            }
        })
    }
}

export const editEmployee = (employee) => {
    return {
        type: 'EDIT_EMPLOYEE',
        payload: employee
    }
}

export const startEditEmployee = (employee,redirect) => {
    return(dispatch) => {
        axios.put(`/apiv1/employees/${employee.id}`,employee,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            if (response.data.errors) {
                swal(`${response.data.message}`,"","error")
            } else {
                const employee = response.data
                redirect()
                dispatch(editEmployee(employee))
            }
        })
    }
}

export const updateEmployeeDepartment = (department) => {
    return {
        type: 'UPDATE_EMPLOYEE_DEPARTMENT',
        payload: department
    }
}