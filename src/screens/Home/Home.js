import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import { Button } from "native-base";
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image'
const images = [
  require('../../assets/SwiperImages/1.jpg'),
  require('../../assets/SwiperImages/2.jpg'),
  require('../../assets/SwiperImages/3.jpg')
]
export default class Home extends Component {
  render() {
    let imgs = []
    for (let index = 0; index < images.length; index++) {
      imgs.push(<FastImage
      key = {index+Math.random()}
        source={images[index]}
        style={styles.banner}
        resizeMode={'stretch'} />)

    }
    let products1 = []
    for (let index = 0; index < 10; index++) {
      products1.push(<FastImage
      key = {index+Math.random()}
        source={images[index%images.length]}
        style={styles.product}
        resizeMode={'stretch'} />)

    }
    let products2 = []
    for (let index = 10; index > 0; index--) {
      products2.push(<FastImage
      key = {index+Math.random()}
        source={images[index%images.length]}
        style={styles.product}
        resizeMode={'stretch'} />)

    }
    return (
      <ScrollView style={{ width: "100%" }}>
        <View style={{ height: 300 }}>
          <Swiper
            loop
            autoplay
            style={styles.wrapper}>
            {imgs}

          </Swiper>
        </View>
        <ScrollView style={{ height: 150 }} horizontal>
          {products1}
        </ScrollView>
        <View style = {{margin:10, flexDirection:"row" , justifyContent:"space-between" , alignItems:"center"} }>
          <Text>
            Sponsored Flowers
          </Text>
          <Button danger><Text> View All </Text></Button>
          </View>
        <ScrollView style={{ height: 150 }} horizontal>
          {products2}
        </ScrollView>
        <View style = {{margin:10, flexDirection:"row" , justifyContent:"space-between" , alignItems:"center"} }>
          <Text>
            Free Flowers
          </Text>
          <Button danger><Text> View All </Text></Button>
          </View>

        
      </ScrollView>




    );
  }
}


const styles = StyleSheet.create({
  banner: {
    width: "100%",
    height: 400
  },
  product:{
    width:100,
    margin:10,
    height:"100%"
  },
  wrapper: {
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})


AppRegistry.registerComponent('myproject', () => Swiper);