import { GET_FLOWERS, UI_START_LOADING, UI_STOP_LOADING , ADD_TO_CART } from "../actions/actionTypes";
initialState = {
    loading: false,
    sponsoredData: [],
    unSponsoredData: [],
    error: null,
    refreshing: false,
    counter:0,
    flowers:[],
    totalPrices:0

};

export default reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FLOWERS:
        let sponsoredData = state.sponsoredData;
        let unSponsoredData = state.unSponsoredData;
        action.data.sponsored?sponsoredData = action.data.data:unSponsoredData = action.data.data
            return {
                ...state,
                sponsoredData,
                unSponsoredData,
                ...action.data
            }
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
                flowers:action.payload.flowers,
                totalPrices:action.payload.totalPrices
            }
        default:
            return state
    }
}