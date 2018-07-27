import {ADD_TO_CART } from "../actions/actionTypes";
initialState = {
  counter:0,
  carts:[]
};

export default reducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_TO_CART:
        return{
            ...state,
            counter:1
        }
        default:
        return state
    }
}