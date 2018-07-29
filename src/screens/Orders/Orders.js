import React , { Component } from "react";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import { Container, Content, Card, Text , View, Icon } from 'native-base';
import {  TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
class Orders extends Component {
    goBack = ()=>{
        this.props.navigator.pop({
            animated: true, // does the pop have transition animation or does it happen immediately (optional)
            animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
        });
    }
    render(){
        return(
        <Container>
         <CustomHeader  name="md-arrow-back" navigator={this.props.navigator}  color ="black" logo = {true} title="FlowersList" transparent = {true} buttonAction = {this.goBack} />
        <Content>
          <Card>
             <View style = {{flexDirection:"row",flex:1 ,alignItems:"center",margin:5}}>
                      <FastImage
                      source = {require("../../assets/SwiperImages/1.jpg")}
                      style = {{width:150,height:150}}
                      resizeMode = "cover"
                      />
           <View style = {{flexDirection:"column",flex:1,marginLeft:20}} >
           <View style = {{flexDirection:"row"}} >
                <Text style = {{marginRight:50}} >
                   //Your text here
                </Text>
                <TouchableOpacity>
                <Icon name = "md-trash"/>
                </TouchableOpacity>
                </View>
                <Text>Description </Text>
                <View style = {{flexDirection:"row",justifyContent:"space-between"}} >
                    <Text>price</Text>
                    <Text>21995</Text>
                </View>
                </View>
            </View>
          </Card>
        </Content>
      </Container>);
       

    }
}

export default Orders