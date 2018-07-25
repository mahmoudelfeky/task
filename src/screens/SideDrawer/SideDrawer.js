import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DrawerItem, { } from "../../components/DrawerItem/DrawerItem";
import FastImage from 'react-native-fast-image'
const images = require('../../assets/logo.jpg')
class SiderDrawer extends Component {
    render() {
        return (
       
        <View style={styles.container}>
        <View style = {styles.header}>
        <View style = {styles.headerContent}>
        <FastImage
        source={images}
        style={styles.logo}
        resizeMode={'cover'} />
        <Text style ={{color:`white`}}>Place Holder</Text>
        </View>
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
    },
    headerContent:{
        marginLeft:10,
        flex:1,
        flexDirection:`column`,
        justifyContent:`space-around`
    },
    logo:{
        width:100,
        height:100,
        borderRadius:150
    }
})

export default SiderDrawer