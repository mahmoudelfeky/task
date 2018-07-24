import { SIGN_IN, SIGN_UP } from "./actionTypes";
import { Navigation } from "react-native-navigation";

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
                Navigation.startSingleScreenApp({
                    screen: {
                      screen: 'Task.Home', // unique ID registered with Navigation.registerScreen
                      title: 'Home', // title of the screen as appears in the nav bar (optional)
                     
                    },
                  })
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