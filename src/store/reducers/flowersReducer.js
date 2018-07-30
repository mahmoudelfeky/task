import { GET_FLOWERS, UI_START_LOADING, UI_STOP_LOADING , ADD_TO_CART , GET_CART ,ADD_TO_FAV , CHECKOUT } from "../actions/actionTypes";
initialState = {
    sponsored:{
        data:[],
        loading: false,
        error: null,
        refreshing: false,
        pageCount:1
    },
    unSponsored:{
        data:[],
        loading: false,
        error: null,
        refreshing: false,
        pageCount:1
    },
   
    counter:0,
    flowers:[],
    totalPrice:0

};

export default reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FLOWERS:
        let sponsored = state.sponsored;
        let unSponsored = state.unSponsored;
        // console.log("NEw Data" , action.data)
        action.data.sponsored?sponsored = action.data:unSponsored = action.data
            res =  {
                ...state,
                sponsored:{
                    ...state.sponsored,
                    ...sponsored
                },
                unSponsored:{
                    ...state.unSponsored,
                    ...unSponsored
                }
            }
            // console.log("old Data" , res)
            return res
        case UI_START_LOADING:
            return {
                ...state,
                loading: true
            }
        case UI_STOP_LOADING:
            return {
                ...state,
                loading: false
            }
            case ADD_TO_CART:
            return {
                ...state,
                counter: state.counter+1,
                // flowers:action.payload.flowers,
                // totalPrices:action.payload.totalPrices
            }
            case GET_CART:
            return{
                ...state,
                flowers:action.payload.flowers,
                totalPrice:action.payload.totalPrice,
                counter:action.payload.flowers.length
            }
            case CHECKOUT:
            return{
                ...state,
                flowers:[],
                totalPrice:0,
                counter:0
            }
            case  ADD_TO_FAV:
            return;
        default:
            return state
    }
}