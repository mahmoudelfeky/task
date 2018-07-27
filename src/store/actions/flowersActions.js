import { GET_FLOWERS , ADD_TO_CART} from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "./ui";
import BASE_URL from "../../AppConfig";
export const getFlowers = ( page, data) => {

    return dispatch => {
        dispatch(
            setData({
                loading: true
            }))
            
        // const url =BASE_URL +`/flowers?page=${page}&limit=20`;
        const url = `https://randomuser.me/api/?&page=${page}&results=20`;
        fetch(url)
            .then(res => res.json())
            .then(res => {
                // alert("sucees")
                setTimeout(() => {
                    dispatch(
                        setData({
                            data: page === 1 ? res.results : [...data, ...res.results],
                            error: res.error || null,
                            loading: false,
                            refreshing: false
                        })
                    );
                }, 2000)
            })
            .catch(error => {
                // alert("failed")
                dispatch(
                    setData({
                        loading: true
                    }))
                dispatch(setData({
                    refreshing: false
                }))
            });
    }
}

export const setData = data => {
    return {
        type: GET_FLOWERS,
        data
    }
}
export const addToCart = data=>{
    return dispatch=>{
        dispatch({
            type:ADD_TO_CART,
            payload:data
        })
    }
}
export const handleMore = data => {
    return dispatch => {
        dispatch(
            setData({
                page: data.page
            }))
        dispatch(getData( data.page, data.data))
    }
}
