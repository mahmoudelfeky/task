import {SAVE_USER } from "../actions/actionTypes";
initialState = {
  
};

export default reducer = (state = initialState, action) => {
    switch(action.type){
        case SAVE_USER:
        return{
            ...state,
            ...action.payload
        }
        default:
        return state
    }
}