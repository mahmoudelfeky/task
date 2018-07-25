
import { Navigation } from "react-native-navigation";
import Login from "./src/screens/Login/Login";
import SignUp from "./src/screens/SignUp/SignUp";
import Home from "./src/screens/Home/Home";
import SideDrawer from "./src/screens/SideDrawer/SideDrawer";
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';
import StartHome from "./src/screens/StartHome/StartHome";

import FlowersList from "./src/screens/FlowersList/FlowersList";
const store = configureStore();


Navigation.registerComponent("Task.Login",()=>Login,store,Provider)
Navigation.registerComponent("Task.SignUp",()=>SignUp,store,Provider)
Navigation.registerComponent("Task.FlowersList",()=>FlowersList,store,Provider)

Navigation.registerComponent("Task.Home",()=>Home)

Navigation.registerComponent("Task.SideDrawer",()=>SideDrawer)


Navigation.startSingleScreenApp({
  screen: {
    screen: 'Task.FlowersList', // unique ID registered with Navigation.registerScreen
    title: 'Florist', // title of the screen as appears in the nav bar (optional)
    // navigatorStyle: {
    //   navBarHidden:true
    // }
  },
})
// StartHome();