import React from "react";
import { View , TouchableOpacity } from "react-native";
import { Card , Icon , Text } from "native-base";
import FastImage from "react-native-fast-image";
const CartItem = props=>{

    return(
        <Card style = {{flex:1}}>
        <View style = {{flexDirection:"row",flex:1 ,alignItems:"center",margin:5}}>
                 <FastImage
                 source = {{uri:props.uri}}
                 style = {{width:150,height:150}}
                 resizeMode = "cover"
                 />
      <View style = {{flexDirection:"column",flex:1,marginLeft:20}} >
      <View style = {{flexDirection:"row" , justifyContent:`space-between`}} >
           <Text style = {{width:150}} >
              {props.desc}
           </Text>
           <TouchableOpacity>
           <Icon name = "md-trash"/>
           </TouchableOpacity>
           </View>
           <Text>{props.name} </Text>
           <View style = {{flexDirection:"row",justifyContent:"space-between"}} >
               <Text>price:</Text>
               <Text>{props.price}</Text>
           </View>
           </View>
       </View>
     </Card>
    )
}

export default CartItem