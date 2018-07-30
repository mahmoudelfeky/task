import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from "react";

const startTabs = () => {
    Promise.all([
        Icon.getImageSource(Platform.OS === 'android' ? "md-menu" : "ios-menu", 30)
    ]).then(sources => {
        Navigation.startSingleScreenApp({
            screen: {
              screen: 'Task.Home', // unique ID registered with Navigation.registerScreen
            //   title: 'Welcome', // title of the screen as appears in the nav bar (optional)
              navigatorStyle: {
                  navBarHidden:true
              }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
              navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
            },
            drawer: {
              // optional, add this if you want a side menu drawer in your app
              left: {
                // optional, define if you want a drawer from the left
                screen: 'Task.SideDrawer', // unique ID registered with Navigation.registerScreen
                passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
                disableOpenGesture: false, // can the drawer be opened with a swipe instead of button (optional, Android only)
               
              }
            }
          });
    });
};

export default startTabs;