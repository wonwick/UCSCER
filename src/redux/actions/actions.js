// src/redux/actions/actions.js

/** */
import axios from 'axios'

//const url = "http://localhost:5000/api/"
const url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/api/"

export function loadSubjects () {
    return (dispatch) => {
        axios.get(`${url}subjects`)
        .then((res) => {
            let subjects = res.data
            
            dispatch({type:'LOAD_SUBJECTS', "data":subjects})
        }).catch((err) => {
            console.log(err)
        })
    }
}
// sign in user given the right username and password
export function SignInUser (user_data) {
    return (dispatch) => {
        axios.post(`${url}Authenticate`,user_data).then((res)=>{
            let user = res.data
            //localStorage.setItem('Auth', JSON.stringify(user))
            dispatch({type: 'SET_USER', "data":user})
        }).catch((err)=>console.log(err))
    }
}

export function toggleClose() {
    return (dispatch) => {
        dispatch({type: 'TOGGLE_MODAL', modalMode: false})
    }
}
export function toggleOpen() {
    return (dispatch) => {
        dispatch({type: 'TOGGLE_MODAL', modalMode: true})        
    }    
}