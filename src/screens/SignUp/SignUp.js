import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Icon, Button, Text } from 'native-base';
import { View, ImageBackground, StyleSheet, TouchableOpacity,Image } from "react-native";
import ImagePicker from "react-native-image-picker";

bg = require("../../assets/1.jpg");
profileImage = require("../../assets/profile.png");
export default class SignUp extends Component {
    state = {
        pickedImaged: profileImage,
        picked:false
      }


      pickImageHandler = () => {
        ImagePicker.showImagePicker({title: "Pick an Image"}, res => {
          if (res.didCancel) {
            console.log("User cancelled!");
          } else if (res.error) {
            console.log("Error", res.error);
          } else {
            this.setState({
              pickedImaged: { uri: res.uri },
              picked:true
            });
          }
        });
      }

    render() {
        let imageWidth= imageHeight = 70;
        let backgroundColor = "white";
        if(this.state.picked)
        {
            imageWidth= imageHeight = 90;
            let backgroundColor = "transparent";
        }
        return (

            <Container  >
                <ImageBackground style={styles.bg} source={bg}>
              
                    
                    <Content>
                        <View style = {[styles.logo,{backgroundColor:backgroundColor}]}>
                        <TouchableOpacity onPress = {this.pickImageHandler}>
                    <Image source = {this.state.pickedImaged} style={{ borderRadius:50,   width: imageWidth,height:imageHeight }} />
                    </TouchableOpacity>
                    </View>
                        <Form>
                            <Item last>
                                <Icon name="ios-person-outline" style={{ color: `white` }} />
                                <Input placeholderTextColor="#818181" placeholder="Username" style={{ color: "#808080" }} />



                            </Item>

                            <Item last>
                                <Icon name="mail" style={{ color: `white` }} />
                                <Input placeholderTextColor="#818181"  placeholder="Email" />
                            </Item>

                            <Item last>
                                <Icon name="ios-lock-outline" style={{ color: `white` }} />
                                <Input placeholderTextColor="#818181" secureTextEntry placeholder="Password" />
                            </Item>
                            <Button block style={styles.loginButton}>
                                <Text uppercase = {false} >Sign Up</Text>
                            </Button>
                        </Form>
                    </Content>
                    <View style={styles.signUpView}>
                        <Text style={{ color: "#6F6F6D" }}>Already have an acount? </Text>
                        <TouchableOpacity transparent ><Text style={{ color: "#A3A7A8" }}>Sign In</Text></TouchableOpacity>
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
        margin: 50,
        borderRadius: 50,
        
        width: 90,
        height: 90,
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