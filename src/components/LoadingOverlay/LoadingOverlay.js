import React, { Component } from "react";
import { View, Image, Text, ActivityIndicator, Platform } from "react-native";
import { Icon } from "native-base";

class LoadingOverlay extends Component {


    render() {
        return(
        <View style={{ zIndex: 3000, position: 'absolute', bottom: 0, left: 0, right: 0, top: 0, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' }} >
            <ActivityIndicator style={{ justifyContent: 'center', alignItems: 'center' }} size="large" color="white" />
        </View>);

    }
}

export default LoadingOverlay;