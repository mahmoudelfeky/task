
import { Navigation } from "react-native-navigation";
import Login from "./src/screens/Login/Login";
import SignUp from "./src/screens/SignUp/SignUp";
import Home from "./src/screens/Home/Home";
import SideDrawer from "./src/screens/SideDrawer/SideDrawer";
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';
import StartHome from "./src/screens/StartHome/StartHome";
import FlowerDetail from "./src/screens/FlowerDetail/FlowerDetail";
import FlowersList from "./src/screens/FlowersList/FlowersList";
import Orders from "./src/screens/Orders/Orders";
const store = configureStore();


Navigation.registerComponent("Task.Login",()=>Login,store,Provider)
Navigation.registerComponent("Task.SignUp",()=>SignUp,store,Provider)
Navigation.registerComponent("Task.FlowersList",()=>FlowersList,store,Provider)
Navigation.registerComponent("Task.Home",()=>Home,store,Provider)
Navigation.registerComponent("Task.SideDrawer",()=>SideDrawer)
Navigation.registerComponent("Task.FlowerDetail",()=>FlowerDetail,store,Provider)

Navigation.registerComponent("Task.Orders",()=>Orders)


Navigation.startSingleScreenApp({
  screen: {
    screen: 'Task.Login', // unique ID registered with Navigation.registerScreen
    // title: 'Florist', // title of the screen as appears in the nav bar (optional)
    navigatorStyle: {
      navBarHidden:true
    }
  },
})
// StartHome();