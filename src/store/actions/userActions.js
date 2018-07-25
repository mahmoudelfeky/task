import { SAVE_USER, } from "./actionTypes";
import { Navigation } from "react-native-navigation";
import BASE_URL from "../../AppConfig";
import StartHome from "../../screens/StartHome/StartHome";
export const signIn = (values, bag) => {
    return async dispatch => {
        const url = BASE_URL + `/user/login`

        var data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': values.email,
                'password': values.password
            })
        };


        try {

            let response = await fetch(url, data)
            let responseJson = await response.json();
            bag.setSubmitting(false);
            if(responseJson.user){
                dispatch(saveUser(responseJson.user))
                StartHome();
            }
            else
            {
                console.log(response)
            }

        }
        catch (error) {
            bag.setSubmitting(false);
            console.log(error)
            if(error.message)
            {
                alert(error.message)
            }
            else{
                alert("No Internet Connection")
            }
        }
    }
}

export const signUp = (values, bag,image) => {
    return async dispatch => {
        if(!image.picked)
        {
            bag.setSubmitting(false);
            alert("Iamge is Required")
            return}
        const url = BASE_URL+ `/user/signup`
        const data = new FormData();
        data.append('userName', values.userName); // you can append anyone.
        data.append('email', values.email);
        data.append('password', values.password);
        data.append('userimage', {
            uri: image.uri,
            type: image.type
        });



        try {
            let response = await fetch(url, {
                method: 'post',
                body: data,
                headers: {
                    'Content-Type': 'multipart/form-data'
                  }
            })
            let responseJson = await response.json();
            if(responseJson.user){

                
                
                dispatch(saveUser(responseJson.user))
                StartHome();
            }
            else
            {
                alert(JSON.stringify(responseJson))
            }
            
            bag.setSubmitting(false);
        }
        catch (error) {
            bag.setSubmitting(false);
            if(error.message)
            {
                alert(JSON.stringify( error.message))
            }
            else{
                alert("No Internet Connection")
            }
        }

    }
}

const saveUser = data=>{
    return{
        type:SAVE_USER,
        payload:data
    }
}