import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Icon , Button ,Text} from 'native-base';
import { View ,ImageBackground} from "react-native";
bg  = require( "./src/assets/1.jpg");
export default class App extends Component {
  render() {
    return (
     
      <Container  >
         <ImageBackground style = {{width:`100%`,height:`100%` ,flex:1}} source = {bg}>
       
        <View style={{
          alignSelf:`center`,
          margin:100,
          borderRadius: 50,
          backgroundColor: "white",
          width: 80,
          height: 80,
          justifyContent:`center`,
          alignItems:`center`
        }}>
          <Icon name="md-checkmark" style = {{color:`#FF3366`,fontSize: 60}} />
        </View>
        <Content>
          <Form>
            <Item last>
              <Icon name="ios-person-outline" style =  {{color:`white`}} />
              <Input placeholder="Username" />


            </Item>
            <Item last>
              <Icon name="ios-lock-outline"   style = {{color:`white`}}/>
              <Input placeholder="Password" />
            </Item>
            {/* <View> */}
            <Button style = {{justifyContent:"center" , width:"100%", marginTop:50 ,backgroundColor:"#FF3366"}}>
            <Text >Sign In</Text>
          </Button>
          {/* </View> */}
          </Form>
        </Content>
        
      </ImageBackground>
      </Container>
    );
  }
}