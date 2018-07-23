import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Icon, Button, Text } from 'native-base';
import { View, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import SignUp from '../SignUp/SignUp';

bg = require("../../assets/1.jpg");
export default class LogIn extends Component {
  signUp = () => {
    this.props.navigator.push({
      screen: 'Task.SignUp', // unique ID registered with Navigation.registerScreen
      title: "SignUp",
      navigatorStyle: {
        navBarHidden:true
      }
    })
  }
  render() {
    return (

      <Container  >
        <ImageBackground style={styles.bg} source={bg}>

          <Content>
            <View style={styles.logo}>
              <Icon name="md-checkmark" style={{ color: `#FF3366`, fontSize: 60 }} />
            </View>
            <Form>
              <Item last>
                <Icon name="ios-person-outline" style={{ color: `white` }} />
                <Input placeholderTextColor="#818181" placeholder="Username" style={{ color: "#808080" }} />


              </Item>
              <Item last>
                <Icon name="ios-lock-outline" style={{ color: `white` }} />
                <Input placeholderTextColor="#818181" secureTextEntry placeholder="Password" />
              </Item>
              <Button block style={styles.loginButton}>
                <Text uppercase={false}>Sign In</Text>
              </Button>
            </Form>
          </Content>
          <View style={styles.signUpView}>
            <Text style={{ color: "#6F6F6D" }}>Don't have an acount? </Text>
            <TouchableOpacity transparent  onPress = {this.signUp}>
              <Text style={{ color: "#A3A7A8" }}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  bg: {
    width: `100%`,
    height: `100%`
  },
  logo: {
    alignSelf: `center`,
    margin: 80,
    borderRadius: 50,
    backgroundColor: "white",
    width: 80,
    height: 80,
    justifyContent: `center`,
    alignItems: `center`
  },
  loginButton: {
    marginTop: 80,
    backgroundColor: "#FF3366"
  },
  signUpView: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    marginBottom: 50
  }
})