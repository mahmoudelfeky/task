import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DrawerItem, { } from "../../components/DrawerItem/DrawerItem";

class SiderDrawer extends Component {
    render() {
        return (
       
        <View style={styles.container}>
        <View style = {styles.header}>
            
        </View >
         <View>
            <DrawerItem name={Platform.OS === "android" ?"md-home" : "ios-home"}
                size={30}
                color="#aaa"
                title = "Home" />
            <DrawerItem name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
                size={30}
                color="#aaa"
                title = "Orders" />
            <DrawerItem name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
                size={30}
                color="#aaa"
                title = "Log Out"/>
                 </View>
  
        </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
       
        backgroundColor: "#FAFAFA",
        width: Dimensions.get("window").width * .8,
        flex: 1
    },
    header:{
        width:"100%",
        height:"30%",
        backgroundColor:"#FF4081"
    }
})

export default SiderDrawer