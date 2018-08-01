import React , { Component } from "react";
import { View,Text,Dimensions,StyleSheet,TouchableOpacity ,Platform} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

class DrawerItem extends Component{
    render()
    {
        return(
      <TouchableOpacity style = {{marginBottom:10}} onPress = {()=>this.props.action()}>
          <View style = {styles.drawerItem}>
          <Icon 
          style = {styles.drawerItemIcon}
          {...this.props}></Icon>
              <Text style = {{color:"black"}}>{this.props.title}</Text>
          </View>
      </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
   
    drawerItem: {
        flexDirection:"row",
        paddingLeft: 30,
        alignItems:"center",
        marginTop:10,
        marginLeft:10,
    },
    drawerItemIcon:{
        marginRight:40
    },
    
})

export default DrawerItem