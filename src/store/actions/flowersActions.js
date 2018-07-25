import { GET_FLOWERS } from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "./ui";
export const getFlowers = (seed, page, data) => {

    return dispatch => {
        dispatch(
            setData({
                loading: true
            }))
        const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
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
export const handleMore = data => {
    return dispatch => {
        dispatch(
            setData({
                page: data.page
            }))
        dispatch(getData(data.seed, data.page, data.data))
    }
}
