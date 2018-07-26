import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from "react";

const startTabs = () => {
    Promise.all([
        Icon.getImageSource(Platform.OS === 'android' ? "md-home" : "ios-home", 30),
        Icon.getImageSource(Platform.OS === 'android' ? "md-share-alt" : "ios-share", 30),
        Icon.getImageSource(Platform.OS === 'android' ? "md-menu" : "ios-menu", 30)
    ]).then(sources => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: "Task.Home",
                    label: "Home",
                    title: "Florist",
                    icon: sources[0],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    },
                    navigatorStyle: {
                        navBarHidden:true
                    }
                },
                
            ],
            tabsStyle: {
                tabBarSelectedButtonColor: "#262262"
            },
            drawer: {
                left: {
                    screen: "Task.SideDrawer"
                }
            },
            appStyle: {
                tabBarSelectedButtonColor: "#B12985"
            },
        });
    });
};

export default startTabs;