import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DrawerItem from "../../components/DrawerItem/DrawerItem";
import FastImage from 'react-native-fast-image'
import { connect } from "react-redux";
import BASE_URL from "../../AppConfig";
const images = require('../../assets/logo.jpg')
class SiderDrawer extends Component {

    goToOrders = () => {
        this.props.navigator.push({
            screen: 'Task.Orders', // unique ID registered with Navigation.registerScreen
            navigatorStyle: {
                navBarHidden: true,
                tabBarHidden: true
            },


        })
    }

    goToProfile = () => {
        this.props.navigator.push({
            screen: 'Task.Profile', // unique ID registered with Navigation.registerScreen
            navigatorStyle: {
                navBarHidden: true,
                tabBarHidden: true
            },
            passProps:{
                profileImage:BASE_URL+`/`+ this.props.profileImage,
                name:this.props.userName,
                email:this.props.email

            }


        })
    }


    logOut = ()=>{
        this.props.navigator.resetTo({
            screen: 'Task.Login', // unique ID registered with Navigation.registerScreen
            navigatorStyle: {
                navBarHidden: true,
                tabBarHidden: true
            },


        })
    }
    render() {
        console.log(BASE_URL+`/`+ this.props.profileImage)
        return (

            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                    <TouchableOpacity onPress = {()=>this.goToProfile()} >
                        <FastImage
                            source={{uri:BASE_URL+`/`+ this.props.profileImage}}
                            style={styles.logo}
                            resizeMode={'cover'} />
                            </TouchableOpacity>
                        <Text style={{ color: `white` }}>Place Holder</Text>
                    </View>
                </View >
                <View>
                    <DrawerItem name={Platform.OS === "android" ? "md-home" : "ios-home"}
                        size={30}
                        color="#aaa"
                        title="Home" />
                    <DrawerItem name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
                        size={30}
                        color="#aaa"
                        title="Orders"
                         action={this.goToOrders} />
                    <DrawerItem name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
                        size={30}
                        color="#aaa"
                        title="Log Out"
                        action={this.logOut} />
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
    header: {
        width: "100%",
        height: "30%",
        backgroundColor: "#FF4081"
    },
    headerContent: {
        marginLeft: 10,
        flex: 1,
        flexDirection: `column`,
        justifyContent: `space-around`
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 150
    }
})
const mapStateToPtops = state =>{
    return{
    profileImage:state.user.user.userimage,
    userName:state.user.user.userName,
    userEmail:state.user.user.email
    }
}
export default connect(mapStateToPtops,null)( SiderDrawer)