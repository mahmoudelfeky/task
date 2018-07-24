
import { Navigation } from "react-native-navigation";
import Login from "./src/screens/Login/Login";
import SignUp from "./src/screens/SignUp/SignUp";
import Home from "./src/screens/Home/Home";

import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';

const store = configureStore();


Navigation.registerComponent("Task.Login",()=>Login,store,Provider)
Navigation.registerComponent("Task.SignUp",()=>SignUp,store,Provider)
Navigation.registerComponent("Task.Home",()=>Home)


Navigation.startSingleScreenApp({
  screen: {
    screen: 'Task.Home', // unique ID registered with Navigation.registerScreen
    title: 'Login'
  },
})