import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Icon, Button, Text } from 'native-base';
import { View, ImageBackground, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import ImagePicker from "react-native-image-picker";
import { connect } from "react-redux";
import { signUp } from "../../store/actions/userActions";
import CustomHeader from "../../components/CustomHeader/CustomHeader";


import FormInput from "../../components/FromInput/FormInput";

import { Formik } from "formik";
import * as yup from "yup";

bg = require("../../assets/1.jpg");
profileImage = require("../../assets/profile.png");
 class SignUp extends Component {
    state = {
        pickedImaged: profileImage,
        picked: false,
        type:null
    }
    handleSubmit = async (values, bag) => {
        this.props.onSignUp(values,bag,
            {picked:this.state.picked,
                uri:this.state.pickedImaged.uri,
            type:this.state.type})

    }

    logIn = () => {
        this.props.navigator.pop({
            animated: true, // does the pop have transition animation or does it happen immediately (optional)
            animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
        });
    }

    pickImageHandler = () => {
        ImagePicker.showImagePicker({ title: "Pick an Image" }, res => {
            if (res.didCancel) {
                console.log("User cancelled!");
            } else if (res.error) {
                console.log("Error", res.error);
            } else {
                this.setState({
                    pickedImaged: { uri: res.uri },
                    type:res.type,
                    picked: true
                });
            }
        });
    }

    render() {

        let imageWidth = imageHeight = 70;
        let backgroundColor = "white";
        if (this.state.picked) {
            imageWidth = imageHeight = 90;
            let backgroundColor = "transparent";
        }
        return (

            <Container  >
                <CustomHeader transparent = {true} navigator = {this.props.navigator} />
                <ImageBackground style={styles.bg} source={bg}>


                    <Content>
                        <View style={[styles.logo, { backgroundColor: backgroundColor }]}>
                            <TouchableOpacity onPress={this.pickImageHandler}>
                                <Image source={this.state.pickedImaged} style={{ borderRadius: 50, width: imageWidth, height: imageHeight }} />
                            </TouchableOpacity>
                        </View>
                        <Formik
                            initialValues={{ email: "", password: "", confirmPassword: "" }}
                            validationSchema={yup.object().shape({
                                userName: yup.string().required(),
                                email: yup.string().email().required(),
                                password: yup.string().min(6).required()

                            })}
                            onSubmit={this.handleSubmit}
                            render={({ values, handleSubmit, setFieldValue, errors, touched, setFieldTouched, isValid, isSubmitting }) => (

                                <React.Fragment>

                                    <FormInput
                                        iconname="ios-person-outline"
                                        name="userName"
                                        last placeholder="Username"
                                        placeholderTextColor="#818181"
                                        style={{ color: "#808080" }}
                                        value={values.userName}
                                        onChange={setFieldValue}
                                        error={touched.userName && errors.userName}
                                        onTouch={setFieldTouched}

                                    />
                                    <FormInput
                                        iconname="ios-lock-outline"
                                        name="email"
                                        last placeholderTextColor="#818181"
                                        placeholder="Email"
                                        value={values.email}
                                        onChange={setFieldValue}
                                        error={touched.email && errors.email}
                                        onTouch={setFieldTouched}
                                    />

                                    <FormInput
                                        iconname="ios-lock-outline"
                                        name="password"
                                        last placeholderTextColor="#818181"
                                        secureTextEntry placeholder="Password"
                                        value={values.password}
                                        onChange={setFieldValue}
                                        error={touched.password && errors.password}
                                        onTouch={setFieldTouched}
                                    />
                                    {isSubmitting ? <ActivityIndicator size = "large" style={{ marginTop: 80 }} /> : (<Button

                                        onPress={handleSubmit}
                                        block style={styles.loginButton}>

                                        <Text uppercase={false}>Sign Up</Text>
                                    </Button>)}


                                </React.Fragment>
                            )}
                        >
                        </Formik>
                    </Content>
                    <View style={styles.signUpView}>
                        <Text style={{ color: "#6F6F6D" }}>Already have an acount? </Text>
                        <TouchableOpacity transparent onPress={this.logIn} ><Text style={{ color: "#A3A7A8" }}>Sign In</Text></TouchableOpacity>
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

const mapDispatchToProps = dispatch=>{
    return{
        onSignUp:(values,bag,image)=>dispatch(signUp(values,bag,image))
    }
}

export default connect(null,mapDispatchToProps)(SignUp);