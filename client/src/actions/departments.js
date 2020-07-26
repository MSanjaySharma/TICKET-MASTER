import axios from '../config/axios'
import { updateEmployeeDepartment } from '../actions/employees'
import {updateTicketDepartment} from '../actions/tickets'

import swal from 'sweetalert'

export const setDepartments = (department) => {
    return {
        type: 'SET_DEPARTMENTS',
        payload: department
    }
}

export const startSetDepartments = () => {
    return (dispatch) => {
        axios.get('/apiv1/departments',{
                    headers: {
                        'x-auth': localStorage.getItem('authToken')
                    }
                })
            .then(response=>{
                const departments = response.data
                dispatch(setDepartments(departments))
            })
            .catch(err=>{
                console.log(err)
            })

    }
}

export const removeDepartment = (department) => {
    return {
        type: 'REMOVE_DEPARTMENT',
        payload: department
    }
}

export const startRemoveDepartment = (id) => {
    return (dispatch) => {
        axios.delete(`/apiv1/departments/${id}`,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const department = response.data
            dispatch(removeDepartment(department))
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

export const addDepartment = (department) => {
    return {
        type: 'ADD_DEPARTMENT',
        payload: department
    }
}

export const startAddDepartment = (department,redirect) => {
    return (dispatch) => {
        axios.post('/apiv1/departments',department,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            if(response.data.errors){
                swal(`${response.data.message}`,"","error")
            } else {
                const department = response.data
                redirect()
                dispatch(addDepartment(department))
            }
        })
    }
}

export const editDepartment = (department) => {
    return {
        type: 'EDIT_DEPARTMENT',
        payload: department
    }
}

export const startEditDepartment = (department,redirect) => {
    return(dispatch) => {
        axios.put(`/apiv1/departments/${department.id}`,department,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response => {
            if (response.data.errors) {
                swal(`${response.data.message}`,"","error")
            } else {
                const department = response.data
                redirect()
                dispatch(editDepartment(department))
                dispatch(updateEmployeeDepartment(department))
                dispatch(updateTicketDepartment(department))
            }
        })
    }
}