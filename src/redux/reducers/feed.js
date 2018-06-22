const initialState = {
    feedPosts: [],
}
export default (state=initialState, action) => {
    switch (action.type) {
        case 'GET_FEED' :
        console.log(action)
        return {
            ...state,
            feedPosts:action.data,
        }
        
        default:
            return{...state}
    }
}