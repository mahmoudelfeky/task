import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import Cart from "../../components/Cart/Cart";
import FastImage from "react-native-fast-image";
const LogoImage  =require(".././../assets/flowerLogo.png");
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
        <Header transparent ={this.props.transparent} style = {{width:"100%"}}>
          <Left>
            <Button transparent onPress = {this.props.buttonAction}>
              <Icon name={this.props.name}  style={{fontSize: 33 , color:this.props.color}} />
            </Button>
          </Left>
          <Body>
          {  logo}
          </Body>
          <Right>
           {cart}
          </Right>
        </Header>
    );
  }
}