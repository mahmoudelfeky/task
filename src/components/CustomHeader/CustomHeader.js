import React, { Component } from "react"
import { View, Text, StatusBar, TouchableOpacity, Platform, StyleSheet } from "react-native";
import { Icon, Button } from "native-base";
import { Navigation } from "react-native-navigation";
import FastImage from "react-native-fast-image";

class AppHeader extends Component {

goBack = ()=>{
    this.props.navigator.pop({
        animated: true, // does the pop have transition animation or does it happen immediately (optional)
        animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
    });
}
    render() {
 return (
     <View style = {styles.statusBar}>
     <TouchableOpacity style ={{backgroundColor}} onPress = {this.goBack}>
     <Icon name="md-arrow-back" style = {{marginLeft:10,marginRight:5}}  />
     </TouchableOpacity>
     <FastImage/>
     <Text style = {styles.title}>{this.props.title}</Text>
     </View>
        );
    }

}

const styles = {
    statusBar:{
        width:`100%`,
        height:`8%`,
        backgroundColor:`white`,
       
        flexDirection:`row`,
        alignItems:`center`,
        shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    marginBottom: 10,
    elevation: 2,
    position: 'relative'
    },
    title:{
        alignSelf:`center`,
        color:`black`,
        fontWeight:`bold`,
        fontSize:20,
        marginLeft:5,
        marginRight:5
    }
}

export default AppHeader;