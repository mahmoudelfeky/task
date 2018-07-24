import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import Swiper from 'react-native-swiper';

const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})

export default class Home extends Component {
  render() {
    return (
      <ScrollView style={{ width: "100%" }}>
        <View style={{ height: 400 }}>
          <Swiper
            loop
            autoplay
            style={styles.wrapper} showsButtons={true}>
            <View style={styles.slide1}>
              <Text style={styles.text}>Hello Swiper</Text>
            </View>
            <View style={styles.slide2}>
              <Text style={styles.text}>Beautiful</Text>
            </View>
            <View style={styles.slide3}>
              <Text style={styles.text}>And simple</Text>
            </View>
          </Swiper>
        </View>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#97CAE5', height: 100
        }}>
          <Text style={styles.text}>Hello Swiper</Text>
        </View>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#97CAE5', height: 100
        }}>
          <Text style={styles.text}>Hello Swiper</Text>
        </View>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#97CAE5', height: 100
        }}>
          <Text style={styles.text}>Hello Swiper</Text>
        </View>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#97CAE5', height: 100
        }}>
          <Text style={styles.text}>Hello Swiper</Text>
        </View>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#97CAE5', height: 100
        }}>
          <Text style={styles.text}>Hello Swiper</Text>
        </View>
      </ScrollView>




    );
  }
}

AppRegistry.registerComponent('myproject', () => Swiper);