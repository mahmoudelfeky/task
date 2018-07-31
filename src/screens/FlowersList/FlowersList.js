import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { connect } from "react-redux";
import { getFlowers, handleMore } from "../../store/actions/flowersActions";
import { ListItem, Left, Body, Right, Thumbnail, Text, SearchBar } from 'native-base';
import { Header  , Icon} from "native-base";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import BASE_URL from "../../AppConfig";
import FastImage from 'react-native-fast-image'
const { width, height } = Dimensions.get('window');
import FavouriteIcon from "../../components/FavouriteIcon/FavouriteIcon";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";
const equalWidth = (width / 2)

class FlowersList extends Component {
  state = {
    page: 1,
    refreshing: false,
    clicked:false
  }
  constructor(props) {
    super(props)
    this.props.navigator.setDrawerEnabled({
      side: "left",
      enabled: false,
      screen: "Task.SideDrawer"
    });
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  onNavigatorEvent(event) {
    switch(event.id) {
      case 'willAppear':
       break;
      case 'didAppear':
        break;
      case 'willDisappear':
        break;
      case 'didDisappear':
      this.setState({
        clicked:false
      })
        break;
      case 'willCommitPreview':
        break;
    }
  }
// coponentdi
  startFlowerDetail = (values) => {
    if(this.state.clicked)
    return;
    this.setState({
      clicked:true
    })
    this.props.navigator.push({
      screen: 'Task.FlowerDetail', // unique ID registered with Navigation.registerScreen
      title: "Flower Detail",
      passProps: {
        values
      },
      navigatorStyle: {
        navBarHidden: true
      }
    })
  }

  componentDidMount() {
    // console.log(this.props.Sponsored, this.props.sponsoredData, this.props.unSponsoredData)
    this.props.onGetFlowers(this.state.page, this.props.token, this.props.Sponsored ?
      this.props.sponsoredData : this.props.unSponsoredData, this.props.Sponsored);
  }


  handleRefresh = () => {
    this.setState({
      page: 1,
      refreshing: true
    }, () => this.props.onGetFlowers(this.state.page,this.props.token, this.props.Sponsored ?
      this.props.sponsoredData : this.props.unSponsoredData, this.props.Sponsored))

  }

  handleMore = () => {

    // console.log(this.props.Sponsored,this.props.sponsoredData.loading,this.props.unSponsoredData.loading,this.props.sponsoredData.pageCount , this.state.page)
    flag = false
    if (this.props.Sponsored) {
      if (this.props.sponsoredData.pageCount <= this.state.page) {
        flag = true;
        return;
      }
    }
    else {
      if (this.props.unSponsoredData.pageCount <= this.state.page) {
        flag = true
        return;
      }
    }

    // console.log("handle more"+ flag)
    this.setState({
      page: this.state.page + 1
    }, () => this.props.onGetFlowers(this.state.page, this.props.token, this.props.Sponsored ?
      this.props.sponsoredData.data : this.props.unSponsoredData.data, this.props.Sponsored))
  }


  renderSeparator = () => {
    return (
      <View
        style={styles.seperator} />
    )
  }
  renderFooter = () => {
    // alert(this.props.loading)
    // console.log("###########", this.props.sponsoredData.loading);
    // console.log("$$$$$$$$$$$$$$, ", this.props.unSponsoredData.loading);

    flag = false
    if (this.props.Sponsored) {

      if (!this.props.sponsoredData.loading) {
        flag = true;
        // console.log("@@@@@@@555555555555555@");

        return null;
      }
    }
    else {

      if (!this.props.unSponsoredData.loading) {
        // console.log("gggggggggggggg");

        flag = true;
        return null;
      }
    }

    // console.log("render footer " + "%%%%%")
    return (

      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE",
          marginTop: 10
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  }
  goBack = () => {
    this.props.navigator.pop({
      animated: true, // does the pop have transition animation or does it happen immediately (optional)
      animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
    });
  }
  render() {
    // alert(this.props.sponsored?this.props.sponsored.pageCount:this.props.unSponsoredData.pageCount)
    // console.log(this.props.Sponsored,this.props.sponsoredData,this.props.unSponsoredData)
    let loadingScreen = this.state.clicked?<LoadingOverlay/>:null;
    return (
      <View style={styles.container}>
      {loadingScreen}
        <CustomHeader notif={this.props.notif} name="md-arrow-back" navigator={this.props.navigator} cart={true} color="black" logo={true} title="FlowersList" transparent={true} buttonAction={this.goBack} />

        {/* <Text>Flowers and bouquets</Text> */}
        <FlatList
          style={{ flex: 1 }}
          ItemSeparatorComponent={this.renderSeparator}
          data={this.props.Sponsored ? this.props.sponsoredData.data : this.props.unSponsoredData.data}
          keyExtractor={item => item.flowerImage + Math.random()}
          numColumns={2}
          extraData = {this.props.data}
          ListFooterComponent={this.renderFooter}
          refreshing={this.props.Sponsored ? this.props.sponsoredData.refreshing : this.props.unSponsoredData.refreshing}
          onRefresh={this.handleRefresh}
          onEndReached={this.handleMore}
          onEndReachedThreshold={.5}
          renderItem={({ item }) => {
            let imageUri = BASE_URL + `/` + item.flowerImage;
            return (
              <TouchableOpacity onPress={() => this.startFlowerDetail({
                uri: imageUri,
                flowerId: item._id,
                name: item.flowerName,
                price: item.price
              })}>
                <View style={{ flexDirection: "column", alignItems: "center" }}>
                  <FastImage
                    style={styles.image}
                    source={{ uri: imageUri }}
                    resizeMode={'cover'}>
                  <FavouriteIcon fav = {item.isFav} userId = {this.props.userId} token = {this.props.token} flowerId = {item._id} />
                  </FastImage>
                  <Text>{item.flowerName}</Text>
                  <Text>{item.price}</Text>

                </View>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    );
  }
}
const imageMarign = 5;
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    flex: 1
  },
  List: {
    borderBottomWidth: 0,
    borderTopWidth: 0
  },
  seperator: {
    height: 1,
    width: "86%",

    marginLeft: "14%"
  },
  footerContainer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#CED0CE"
  },
  image: {
    width: (Dimensions.get("window").width - imageMarign * 4) / 2,
    height: 200,
    margin: imageMarign

  }
})
const mapDispatchToProps = dispatch => {
  return {
    onGetFlowers: (page, token, data, Sponsored) => dispatch(getFlowers(page, token, data, Sponsored))
    // onhandeleMore: (data) => dispatch(handleMore(data))
  }
}
const mapstateToProps = state => {
  return {
    sponsoredData: state.flowers.sponsored,
    unSponsoredData: state.flowers.unSponsored,
    notif: state.flowers.counter,
    token: state.user.token,
    userId: state.user.user._id
  }
}
export default connect(mapstateToProps, mapDispatchToProps)(FlowersList);
