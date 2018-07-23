
import { Navigation } from "react-native-navigation";
import Login from "./src/screens/Login/Login";
import SignUp from "./src/screens/SignUp/SignUp";


Navigation.registerComponent("Task.Login",()=>Login)
Navigation.registerComponent("Task.SignUp",()=>SignUp)


Navigation.startSingleScreenApp({
  screen: {
    screen: 'Task.Login', // unique ID registered with Navigation.registerScreen
    // title: 'Login', // title of the screen as appears in the nav bar (optional)
    navigatorStyle: {
      navBarHidden:true
    }
  },
})