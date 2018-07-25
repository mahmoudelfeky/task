import { GET_FLOWERS, UI_START_LOADING, UI_STOP_LOADING } from "../actions/actionTypes";
initialState = {
    loading: false,
    data: [],
    error: null,
    refreshing: false
};

export default reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FLOWERS:
            return {
                ...state,
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
        default:
            return state
    }
}