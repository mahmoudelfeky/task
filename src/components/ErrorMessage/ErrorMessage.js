import React from "react"
import { Text ,View , StyleSheet } from "react-native";
export default ErrorMessage = props=>{
    return(
        <View style = {styles.container}>
         <Text style ={styles.msg}>{props.msg}</Text>
        </View>
    )
}
const styles = {
    container:{
        width:"90%"
    },
    msg:{
        color:"red",
        flex:1,
        marginLeft:30,
        marginTop:5,
        marginBottom:5
    }
}