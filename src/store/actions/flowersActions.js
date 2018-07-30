import { GET_FLOWERS , ADD_TO_CART,GET_CART ,ADD_TO_FAV , CHECKOUT} from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "./ui";
import BASE_URL from "../../AppConfig";
export const getFlowers = ( page,token, data,sponsored) => {
    return dispatch => {
        console.log("asjashjas"+ sponsored)
        dispatch(
            setData({
                loading: true,
                sponsored
            }))
            
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
                //    console.log(res)
                    dispatch(
                        setData({
                            data: page === 1 ? res.flowers : [...data, ...res.flowers],
                            error: res.error || null,
                            loading: false,
                            refreshing: false,
                            sponsored,
                            pageCount:res.pageCount
                        })
                    );
                }, 2000)
            })
            .catch(error => {
                console.log(error)
                dispatch(
                    setData({
                        loading: false,
                        sponsored
                    }))
                dispatch(setData({
                    refreshing: false,
                    sponsored
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
export const checkOut = (values)=>{
    const url = BASE_URL + `/users/${values.userId}/checkout`
    var data = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + values.token
        }
    }
    return async dispatch => {
        try {
  
              let response = await fetch(url, data)
              let responseJson = await response.json();
              
                  console.log(response)
              if (responseJson.flowers) {
                  // console.log(response.flowers)
                  
                  dispatch({
                      type:CHECKOUT
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
export const getCart = (values)=>{
    const url = BASE_URL + `/users/${values.userId}/cart`
        var data = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + values.token
            }
        };
    return async dispatch => {
      try {

            let response = await fetch(url, data)
            let responseJson = await response.json();
            if (responseJson.cart) {
                // console.log(response.flowers)
                dispatch({
                    type:GET_CART,
                    payload:{
                        flowers:responseJson.cart.flowers,
                        totalPrice:responseJson.cart.totalPrice
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
export const addToCart = values => {
    const url = BASE_URL + `/users/${values.userId}/cart`
        var data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + values.token
            },
            body: JSON.stringify({
                'flower': values.flowerId
            })
        };
    return async dispatch => {
        try {

            let response = await fetch(url, data)
            let responseJson = await response.json();
            if (responseJson.flowers) {
                // console.log(response.flowers)
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
export const addToFav = values => {
    const url = BASE_URL + `/users/${values.userId}/fav`
        var data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + values.token
            },
            body: JSON.stringify({
                'flower': values.flowerId
            })
        };
    return async dispatch => {
        try {

            let response = await fetch(url, data)
            let responseJson = await response.json();
            if (responseJson.flowers) {
                // console.log(response.flowers)
                dispatch({
                    type:ADD_TO_FAV,
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
