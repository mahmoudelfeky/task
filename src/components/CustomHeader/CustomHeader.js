import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title} from 'native-base';
import Cart from "../../components/Cart/Cart";
import FastImage from "react-native-fast-image";
const LogoImage  =require(".././../assets/flowerLogo.png");
import { Platform ,  Text,StyleSheet } from "react-native";
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
export default class CustomHeader extends Component {

  render() {
      let logo  = null;
      if(this.props.logo)
      logo = (
        <FastImage
       
        source={LogoImage}
       style = {{width:50,height:"100%" , alignSelf:"center"}}
        resizeMode={'stretch'} />
      )
      let cart  = null;
      if(this.props.cart)
      cart = (
        <Cart navigator = {this.props.navigator} notif ={this.props.notif}/>
      )
    return (
        <Header transparent ={this.props.transparent} style = {{
          paddingTop: STATUSBAR_HEIGHT,
          // backgroundColor: '#ff7022',
          marginTop:24,
          height: STATUSBAR_HEIGHT + APPBAR_HEIGHT,
          flexDirection: 'row',
          justifyContent: 'center',
          shadowColor: 'black',
          shadowOpacity: 0.1,
          shadowRadius: StyleSheet.hairlineWidth,
          shadowOffset: {
            height: StyleSheet.hairlineWidth,
          },
          elevation: 4,
          zIndex: 7000,
          width:"100%"}}>
          <Left>
            <Button transparent onPress = {this.props.buttonAction}>
              <Icon name={this.props.name}  style={{fontSize: 33 , color:this.props.color}} />
            </Button>
          </Left>
          <Body>
        <Text style = {{marginLeft:30,fontSize:32,color:"#702886"}} >FLORIST</Text>
          </Body>
          <Right>
           {cart}
          </Right>
        </Header>
    );
  }
}