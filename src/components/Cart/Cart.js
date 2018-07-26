import React, { Component } from "react";
import { View, Text ,StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "native-base";

class Cart extends Component {
    render() {
        return (
            <TouchableOpacity>
            <View style={styles.container}>
                <View style={{ position:"absolute",marginLeft:12,width:25,height:25, borderRadius: 100, backgroundColor: "#ED217C" ,justifyContent:"center" ,alignItems:"center"}}>
                    <Text>1</Text>
                </View>
                <Icon name = "ios-cart-outline" style = {{marginTop:12}}/>
            </View>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        width: 50,
        height: 50,
        marginTop:30
    }
})

export default Cart;