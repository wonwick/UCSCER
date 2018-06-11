var jwtDecode = require('jwt-decode');
import { userInfo } from "os";


const initialState = {
    isAuth: false,
    token:"",
    message:"not authenticated",
    profile:{
        type: "",
        index_no:"",
        name:"",    
        year:"",
            }
    
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER': 
        if (action.data.success){
            var decoded = jwt_decode(action.data.token);
            return {
                ...state,
                isAuth: action.data.success,
                token:action.data.token,
                profile:decoded
            }

        }
        else{
            return {
                ...state,
                isAuth: action.data.success,
            }
        }
  }
}