var jwtDecode = require('jwt-decode');
console.log("localprfile"+localStorage.profile)

if(typeof (localStorage.profile) != 'undefined'){
    var profileObject=JSON.parse(localStorage.profile)
}
const initialState = {
    isAuth: localStorage.token,
    token:localStorage.token,
    message:"not authenticated",
    profile:profileObject
    
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER': 
        console.log(action.data)
        if (action.data.success){
            var decoded = jwtDecode(action.data.token);
            console.log(decoded)
            localStorage.setItem('profile',JSON.stringify(decoded))
            localStorage.setItem('isAuth', action.data.success)
            localStorage.setItem('token', action.data.token)
            console.log(localStorage.profile)
            return {
                ...state,
                isAuth: action.data.success,
                token:action.data.token,
                profile:decoded, 
                message:action.data.messege
            }

        }
        else{
            return {
                ...state,
                isAuth: action.data.success,
                message:action.data.messege
            }
        }
     default:
        return{...state}
  }
}