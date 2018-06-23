// src/redux/actions/actions.js

/** */
import axios from 'axios'

//const url = "http://localhost:5000/api/"
const url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/api/"

export function loadSubjects (subject_data) {
    return (dispatch) => {
        console.log(subject_data)
        axios.post(`${url}subjects`,subject_data)
        .then((res) => {
            let subjects = res.data  
            dispatch({type:'LOAD_SUBJECTS', "data":subjects})
        }).catch((err) => {
            console.log(err)
        })
    }
}

export function loadFeed (feed_data) {
    return (dispatch) => {
        axios.post(`${url}feed`,feed_data).then((res)=>{
            let feedPosts = res.data
            dispatch({type: 'GET_FEED', "data":feedPosts})
        }).catch((err)=>console.log(err))
    }
}
// sign in user given the right username and password
export function SignInUser (user_data) {
    return (dispatch) => {
        axios.post(`${url}Authenticate`,user_data).then((res)=>{
            let user = res.data
            //console.log(user_data)
            dispatch({type:'SET_USER', "data":user})
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
export function addSub (subject_data) {
    console.log("firing addSub")
    return (dispatch) => {
        dispatch({type:'PLUS_SUBJECT', "data":subject_data})
    }
}

export function remSub (subject_data) {
    console.log("firing addSub")
    return (dispatch) => {
        dispatch({type:'MINUS_SUBJECT', "data":subject_data})
    }
}

