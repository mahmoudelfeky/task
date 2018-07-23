import React, { Component } from 'react';
import {  StyleSheet , View , TouchableOpacity } from "react-native";

import ImagePicker from "react-native-image-picker";

profileImage = require("../../assets/profile.png");
export default class ImagePicker extends Component{
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
    render(){
        let imageWidth= imageHeight = 70;
        let backgroundColor = "white";
        if(this.state.picked)
        {
            imageWidth= imageHeight = 90;
            let backgroundColor = "transparent";
        }
        return(
            <View style = {[styles.logo,{backgroundColor:backgroundColor}]}>
            <TouchableOpacity onPress = {this.pickImageHandler}>
        <Image source = {this.state.pickedImaged} style={{ borderRadius:50,   width: imageWidth,height:imageHeight }} />
        </TouchableOpacity>
        </View>
        )
    }
}
const styles =  StyleSheet.create({
logo: {
    alignSelf: `center`,
    margin: 50,
    borderRadius: 50,
    
    width: 90,
    height: 90,
    justifyContent: `center`,
    alignItems: `center`
}})