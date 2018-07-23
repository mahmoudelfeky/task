import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Icon, Button, Text } from 'native-base';
import { View, ImageBackground, StyleSheet } from "react-native";

bg = require("./src/assets/1.jpg");
export default class App extends Component {
  render() {
    return (

      <Container  >
        <ImageBackground style={styles.bg} source={bg}>

          <View style={styles.logo}>
            <Icon name="md-checkmark" style={{ color: `#FF3366`, fontSize: 60 }} />
          </View>
          <Content>
            <Form>
              <Item last>
                <Icon name="ios-person-outline" style={{ color: `white` }} />
                <Input placeholder="Username" />


              </Item>
              <Item last>
                <Icon name="ios-lock-outline" style={{ color: `white` }} />
                <Input secureTextEntry placeholder="Password" />
              </Item>
              <Button style={styles.loginButton}>
                <Text >Sign In</Text>
              </Button>
            </Form>
          </Content>

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
    margin: 100,
    borderRadius: 50,
    backgroundColor: "white",
    width: 80,
    height: 80,
    justifyContent: `center`,
    alignItems: `center`
  },
  loginButton: {
    justifyContent: "center",
    width: "100%", marginTop: 50,
    backgroundColor: "#FF3366"
  }
})