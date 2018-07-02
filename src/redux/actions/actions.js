// src/redux/actions/actions.js

/** */
import axios from 'axios'

//const url = "http://localhost:5000/api/"
const url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/api/"

export function loadSubjects(subject_data) {
    return (dispatch) => {
        console.log(subject_data)
        axios.post(`${url}subjects`, subject_data)
            .then((res) => {
                let subjects = res.data
                console.log(subjects)
                dispatch({ type: 'LOAD_SUBJECTS', "data": subjects })
            }).catch((err) => {
                console.log(err)
            })
    }
}

export function getAllSubjects(authData) {
    return (dispatch) => {
        axios.post(`${url}getAllSubjects`,authData)
            .then((res) => {
                let subjects = res.data
                dispatch({ type: 'LOAD_ALL_SUBJECTS', "data": subjects })
            }).catch((err) => {
                console.log(err)
            })
    }
}

// export function loadSelectedSubjects(index_no) {
//     return (dispatch) => {
//         console.log(index_no)
//         axios.post(`${url}Student`, index_no)
//             .then((res) => {
//                 let StudentData = res.data
//                 dispatch({ type: 'LOAD_SELECTED', "StudentData": StudentData })
//             }).catch((err) => {
//                 console.log(err)
//             })
//     }
// }

export function loadFeed(feed_data) {
    return (dispatch) => {
        axios.post(`${url}feed`, feed_data).then((res) => {
            let feedPosts = res.data
            dispatch({ type: 'GET_FEED', "data": feedPosts })
        }).catch((err) => console.log(err))
    }
}
// sign in user given the right username and password
export function SignInUser(user_data) {
    return (dispatch) => {
        axios.post(`${url}Authenticate`, user_data).then((res) => {
            let user = res.data
            //console.log(user_data)
            dispatch({ type: 'SET_USER', "data": user })
        }).catch((err) => console.log(err))
    }
}

export function addUser(user_data) {
    return (dispatch) => {
        console.log("firing addUser")
        axios.post(`${url}AddUser`, user_data).then((res) => {
            let user = res.data
            //console.log(user_data)
            dispatch({ type: 'ADD_USER', "data": user })
        }).catch((err) => console.log(err))
    }
}


export function toggleClose() {
    return (dispatch) => {
        dispatch({ type: 'TOGGLE_MODAL', modalMode: false })
    }
}
export function toggleOpen() {
    return (dispatch) => {
        dispatch({ type: 'TOGGLE_MODAL', modalMode: true })
    }
}
export function addSub(subject_data) {
    console.log("firing addSub")
    return (dispatch) => {
        dispatch({ type: 'PLUS_SUBJECT', "data": subject_data })
    }
}

export function remSub(subject_data) {
    console.log("firing remSub")
    return (dispatch) => {
        dispatch({ type: 'MINUS_SUBJECT', "data": subject_data })
    }
}

export function register(studentWithSubject) {
    console.log("firing register")

    return (dispatch) => {
        axios.post(`${url}registerExam`, studentWithSubject).then((res) => {
            var student = res.data
            //console.log(user_data)
            dispatch({ type: 'REGISTER', "data": student })
        }).catch((err) => console.log(err))
    }
}

export function loadSelectedSubjects(index_no) {
    return (dispatch) => {
        console.log(index_no)
        axios.post(`${url}Student`, index_no)
            .then((res) => {
                let StudentData = res.data
                dispatch({ type: 'LOAD_SELECTED', "StudentData": StudentData })
            }).catch((err) => {
                console.log(err)
            })
    }
}

export function submitRegistration(data) {
    return (dispatch) => {
        axios.post(`${url}RegisterSubject`, data)
            .then((res) => {
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }
}

export function addSubject(subject_data) {
    return (dispatch) => {
        console.log("firing addSubject")
        console.log(subject_data)
        axios.post(`${url}addSubject`, subject_data).then((res) => {
            let subjects = res.data
            console.log(subjects)
            dispatch({ type: 'ADD_SUBJECTS', "data": subjects })
        }).catch((err) => console.log(err))
    }
}

export function setFeed(feedAndType) {
    return (dispatch) => {
        console.log("firing setExam")
        console.log(feedAndType)
        axios.post(`${url}setFeed`, feedAndType).then((res) => {
            console.log(res)
        }).catch((err) => console.log(err))
    }
}

