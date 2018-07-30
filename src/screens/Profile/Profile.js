import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, View } from 'native-base';
import FastImage from "react-native-fast-image";
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setDrawerEnabled({
      side: "left",
      enabled: false,
      screen: "Task.SideDrawer"
    });
  }
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Card>
            <Image source={require("../../assets/profileBg.jpg")} style={{ height: 300, width: null, marginBottom: 100, flex: 1 }} />
            <View style={styles.profileImageContainer} >
              <FastImage
                source={{uri:this.props.profileImage}}
                style={styles.profileImage}
                resizeMode={'cover'} />
            </View>

            <CardItem style = {{justifyContent:"center"}} >
            <Text style = {{fontSize:25}}>{this.props.name} </Text>
             </CardItem>
             <CardItem style = {{justifyContent:"center"}}  >
            <View style = {{flexDirection:"row"}} >
              <Icon name = "md-heart" style = {{color:"red"}}/>
            <Text style = {{marginLeft:15}} >120 photos csj </Text>
            </View>
            </CardItem>
          </Card>
          
          <Card>
            <CardItem>
          <View style = {{flexDirection:"row" }} >
              <Icon name = "ios-flag-outline" />
            <Text style = {{marginLeft:15}} >13 amr alsaka street alsharq zone{"\n"} port said</Text>
            </View>
            </CardItem>
            <CardItem>
            <View style = {{flexDirection:"row"}} >
              <Icon name = "ios-mail-outline"  />
            <Text style = {{marginLeft:15}} >Email:{"\n"+this.props.email} </Text>
            </View>
            </CardItem>
            <CardItem>
            <View style = {{flexDirection:"row"}} >
              <Icon name = "ios-call-outline" />
            <Text style = {{marginLeft:15}} >Phone Number </Text>
            </View>
            </CardItem>
            </Card>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  profileImageContainer: {
    width: 140,
    height: 140,
    backgroundColor: "white",
    borderRadius: 150,
    alignSelf: "center",
    marginTop: 250,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center"
  },
  profileImage: {
    width: 125,
    height: 125,
    borderRadius: 150
  }
})
