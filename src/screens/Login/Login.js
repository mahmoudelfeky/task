import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Icon, Button, Text } from 'native-base';
import { View, ImageBackground, StyleSheet, TouchableOpacity ,ActivityIndicator } from "react-native";
import SignUp from '../SignUp/SignUp';
import FormInput from "../../components/FromInput/FormInput";
import BASE_URL from "../../AppConfig";
import { Formik } from "formik";
import * as yup from "yup";


bg = require("../../assets/1.jpg");
export default class LogIn extends Component {
  signUp = () => {
    this.props.navigator.push({
      screen: 'Task.SignUp', // unique ID registered with Navigation.registerScreen
      title: "SignUp",
      navigatorStyle: {
      navBarHidden: true
      }
    })
  }
  handleSubmit = async (values, bag) => {
    const url =BASE_URL+ `/user/login`

    var data = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify( {
        'email': values.email,
        'password': values.password
      })
  };
  
    
    try {
      
        let response = await fetch(url, data)
        let responseJson = await response.json();
       console.log(responseJson)
        bag.setSubmitting(false);
    }
    catch (error) {
      alert(error)
       console.log(error)
        bag.setSubmitting(false);
        bag.setErrors(error)
    }

}
  
  render() {
    return (

      <Container  >
        <ImageBackground style={styles.bg} source={bg}>

          <Content>
            <View style={styles.logo}>
              <Icon name="md-checkmark" style={{ color: `#FF3366`, fontSize: 60 }} />
            </View>
            <Formik
          initialValues={{ email: "", password: ""}}
          validationSchema = {yup.object().shape({
            email:yup.string().required().email(),
            password:yup.string().required()
          })}
          onSubmit={this.handleSubmit}
          render={({ values, handleSubmit, setFieldValue , errors , touched ,setFieldTouched , isValid , isSubmitting}) => (

            <React.Fragment>

              <FormInput
                iconname="ios-person-outline"
                name="email"
                last placeholder="Email"
                placeholderTextColor="#818181"
                style={{ color: "#808080" }} 
                value = {values.email}
                onChange={setFieldValue}
                error = {touched.email&& errors.email}
                onTouch = {setFieldTouched}

                />
              <FormInput
                iconname="ios-lock-outline"
                name="password"
                last placeholderTextColor="#818181"
                secureTextEntry placeholder="Password"
                value = {values.password}
                onChange={setFieldValue}
                error = {touched.password&& errors.password}
                onTouch = {setFieldTouched}
                />
                {isSubmitting ? <ActivityIndicator size="large" style={{ marginBottom: 50 }} /> :(
              <Button
              onPress={handleSubmit}
              block style={styles.loginButton}>
                <Text uppercase={false}>Sign In</Text>
              </Button>
                )}
              </React.Fragment>
          )}
        >
        </Formik>
          </Content>
          <View style={styles.signUpView}>
            <Text style={{ color: "#6F6F6D" }}>Don't have an acount? </Text>
            <TouchableOpacity transparent onPress={this.signUp}>
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