import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Button } from "native-base";
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image'
import CustomHeader from "../../components/CustomHeader/CustomHeader";
const images = [
  require('../../assets/SwiperImages/1.jpg'),
  require('../../assets/SwiperImages/2.jpg'),
  require('../../assets/SwiperImages/3.jpg')
]
import { connect } from "react-redux";
import { getFlowers, handleMore } from "../../store/actions/flowersActions";
import BASE_URL from "../../AppConfig";

class Home extends Component {
  constructor(props) {
    super(props);

  }
  toggleDrawer = () => {
    this.props.navigator.toggleDrawer({
      side: "left"
    });
  }
  loadFlowersList = (Sponsored) => {
    this.props.navigator.push({
      screen: 'Task.FlowersList', // unique ID registered with Navigation.registerScreen
      title: "Flowers List",
      passProps: {
        Sponsored
      },
      navigatorStyle: {
        navBarHidden: true
      },


    })
  }
  renderImages(Sponsored) {

    let data = Sponsored ? this.props.sponsoredData : this.props.unSponsoredData;
    if (data === undefined)
      return
    return data.map((flower, index) => {
      return (<View 
        key={index + Math.random()+flower.flowerImage}
        style = {{flex:1, flexDirection:`column`,alignItems:`center`}} ><FastImage
       
        source={{ uri: BASE_URL + `/` + flower.flowerImage }}
        style={{ height: `70%`, width: 100, margin: 5 }}
        resizeMode={'stretch'} />
        <Text>{flower.flowerName}</Text><Text>{flower.price}</Text></View>)
    })

  }
  componentDidMount() {
    this.props.onGetFlowers(1, this.props.sponsoredData, true);
    this.props.onGetFlowers(1, this.props.unSponsoredData, false);
  }
  render() {
    let imgs = []
    for (let index = 0; index < images.length; index++) {
      imgs.push(<FastImage
        key={index + Math.random()}
        source={images[index]}
        style={styles.banner}
        resizeMode={'stretch'} />)

    }

    return (
      <View style={{ flex: 1 }}>

        <CustomHeader notif={this.props.notif} name="md-menu" navigator={this.props.navigator} cart={true} color="#9F9F9F" logo={true} title="FlowersList" transparent={true} buttonAction={this.toggleDrawer} />

        <ScrollView style={{ width: "100%" }}>
          <View style={{ height: 300, marginTop: 10 }}>
            <Swiper
              loop
              autoplay
              style={styles.wrapper}>
              {imgs}

            </Swiper>
          </View>
          <ScrollView style={{ height: 200 }} horizontal>
            {
              this.props.loading ? <ActivityIndicator size="large" /> :
                this.renderImages(true)}
          </ScrollView>
          <View style={{ margin: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text>
              Sponsored Flowers
          </Text>
            <Button style={styles.viewAllButton} onPress={() => this.loadFlowersList(true)} >
              <Text style={styles.viewAllText}  > View All </Text></Button>
          </View>
          <ScrollView style={{ height: 200 }} horizontal>
            {
              this.props.loading ? <ActivityIndicator size="large" /> :
                this.renderImages(false)}
          </ScrollView>
          <View style={{ margin: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text>
              Free Flowers
          </Text>
            <Button style={styles.viewAllButton} onPress={() => this.loadFlowersList(false)} >
              <Text style={styles.viewAllText}  > View All </Text></Button>
          </View>


        </ScrollView>
      </View>




    );
  }
}


const styles = StyleSheet.create({
  banner: {
    width: "100%",
    height: 400
  },
  product: {
    width: 100,
    margin: 10,
    height: "100%"
  },
  viewAllButton: {
    backgroundColor: `#ED217C`,
    width: 90,
    justifyContent: `center`,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  viewAllText: {
    color: `white`
  },
  wrapper: {
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})
const mapDispatchToProps = dispatch => {
  return {
    onGetFlowers: (page, data, Sponsored) => dispatch(getFlowers(page, data, Sponsored)),
    onhandeleMore: (data) => dispatch(handleMore(data))
  }
}
const mapstateToProps = state => {
  return {
    loading: state.flowers.loading,
    sponsoredData: state.flowers.sponsoredData,
    unSponsoredData: state.flowers.unSponsoredData,
    page: state.flowers.page,
    error: state.flowers.error,
    refreshing: state.flowers.refreshing,
    notif: state.flowers.counter
  }
}
export default connect(mapstateToProps, mapDispatchToProps)(Home);

// AppRegistry.registerComponent('myproject', () => Swiper);