import { GET_FLOWERS , ADD_TO_CART} from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "./ui";
import BASE_URL from "../../AppConfig";
export const getFlowers = ( page,token, data,sponsored) => {
    return dispatch => {
        dispatch(
            setData({
                loading: true
            }))
            
        // const url =BASE_URL +`/flowers?page=${page}&limit=20`;
        const url = BASE_URL+`/flowers?page=${page}&limit=10&sponsored=${sponsored}`
        fetch(url, {
            method: "GET",
            headers: {
              'Authorization': 'Bearer ' + token
            }
          })
            .then(res => res.json())
            .then(res => {
                setTimeout(() => {
                   
                    dispatch(
                        setData({
                            data: page === 1 ? res.flowers : [...data, res.flowers],
                            error: res.error || null,
                            loading: false,
                            refreshing: false,
                            sponsored
                        })
                    );
                }, 2000)
            })
            .catch(error => {
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
export const addToCart = data => {
    const url = BASE_URL + `/user/${data.userId}/cart`
        var data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + data.token
            },
            body: JSON.stringify({
                'flower': data.flowerId
            })
        };
    return async dispatch => {
       


        try {

            let response = await fetch(url, data)
            let responseJson = await response.json();
            if (responseJson.flowers) {
                
                dispatch({
                    type:ADD_TO_CART,
                    payload:{
                        flowers:responseJson.flowers,
                        totalPrice:responseJson.totalPrice
                    }
                })
               
            }
            else {
                console.log(response)
            }

        }
        catch (error) {
           console.log(error)
        }
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
