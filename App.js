
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
import ShoppingCart from "./src/screens/ShoppingCart/ShoppingCart";
import Orders from "./src/screens/Orders/Orders";
import Profile from "./src/screens/Profile/Profile";
import RecycleTestComponent from "./src/screens/RecycleTestComponent";


const store = configureStore();


Navigation.registerComponent("Task.Login",()=>Login,store,Provider)
Navigation.registerComponent("Task.SignUp",()=>SignUp,store,Provider)
Navigation.registerComponent("Task.FlowersList",()=>FlowersList,store,Provider)
Navigation.registerComponent("Task.Home",()=>Home,store,Provider)
Navigation.registerComponent("Task.SideDrawer",()=>SideDrawer , store,Provider)
Navigation.registerComponent("Task.FlowerDetail",()=>FlowerDetail,store,Provider)
Navigation.registerComponent("Task.ShoppingCart",()=>ShoppingCart,store,Provider)
Navigation.registerComponent("Task.Profile",()=>Profile,store,Provider)
Navigation.registerComponent("Task.Orders",()=>Orders,store,Provider)
Navigation.registerComponent("Task.RecycleTestComponent",()=>RecycleTestComponent,store,Provider)


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