import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { connect } from "react-redux";
import { getFlowers, handleMore } from "../../store/actions/flowersActions";
import { ListItem, Left, Body, Right, Thumbnail, Text, SearchBar } from 'native-base';
import { Header } from "native-base";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import BASE_URL from "../../AppConfig";
import FastImage from 'react-native-fast-image'
const { width, height } = Dimensions.get('window');

const equalWidth = (width / 2 ) 

class FlowersList extends Component {
  state = {
    page: 1,
    refreshing: false
  }

  startFlowerDetail = (values)=>{
    this.props.navigator.push({
      screen: 'Task.FlowerDetail', // unique ID registered with Navigation.registerScreen
      title: "Flower Detail",
      passProps: {
        values
      },
    navigatorStyle: {
      navBarHidden:true
    }
})
  }

  componentDidMount() {
    this.props.onGetFlowers(this.state.page,this.props.Sponsored?
      this.props.sponsoredData:this.props.unSponsoredData,this.props.Sponsored);
  }


  handleRefresh = () => {
    this.setState({
      page: 1,
      refreshing: true
    }, () =>   this.props.onGetFlowers(this.state.page,this.props.Sponsored?
      this.props.sponsoredData:this.props.unSponsoredData,this.props.Sponsored))

  }

  handleMore = () => {
    if(this.props.Sponsored)
    {
      if(this.props.sponsoredData.length<10)
      return
    }
    else
    {
      if(this.props.unSponsoredData.length<10)
      return
    }
    this.setState({
      page: this.state.page + 1
    }, () =>   this.props.onGetFlowers(this.state.page,this.props.Sponsored?
      this.props.sponsoredData:this.props.unSponsoredData,this.props.Sponsored))
  }


  renderSeparator = () => {
    return (
      <View
        style={styles.seperator} />
    )
  }
  renderFooter = () => {
    // alert(this.props.loading)
    if (!this.props.loading) return null;

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
  goBack = ()=>{
    this.props.navigator.pop({
        animated: true, // does the pop have transition animation or does it happen immediately (optional)
        animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
    });
}
  render() {

    return (<View style ={styles.container}>
     <CustomHeader notif = {this.props.notif} name="md-arrow-back" navigator={this.props.navigator} cart ={true} color ="black" logo = {true} title="FlowersList" transparent = {true} buttonAction = {this.goBack} />
    {/* <Text>Flowers and bouquets</Text> */}
      <FlatList
        style={{ flex: 1 }}
        ItemSeparatorComponent={this.renderSeparator}
        data={this.props.Sponsored?this.props.sponsoredData:this.props.unSponsoredData}
        keyExtractor={item => item.flowerImage}
        numColumns={2}
        ListFooterComponent={this.renderFooter}
        refreshing={this.props.refreshing}
        onRefresh={this.handleRefresh}
        onEndReached={this.handleMore}
        onEndReachedThreshold={.5}
        renderItem={({ item }) => {
          let imageUri =  BASE_URL+`/`+  item.flowerImage;
          return (
         <TouchableOpacity onPress = {()=>this.startFlowerDetail({
           uri: imageUri,
           name:item.flowerName,
           price:item.price})}>
            <View  style = {{flexDirection:"column" ,alignItems:"center"}}>
              <FastImage
              style = {styles.image}
                source={{ uri:imageUri }}
                resizeMode={'cover'} />
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
  container:{
    flexDirection:"column",
    alignItems:"center",
     flex:1},
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
    width: (Dimensions.get("window").width-imageMarign*4) / 2,
    height: 200,
    margin:imageMarign

  }
})
const mapDispatchToProps = dispatch => {
  return {
    onGetFlowers: (page, data,Sponsored) => dispatch(getFlowers(page, data,Sponsored)),
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
    notif:state.flowers.counter
  }
}
export default connect(mapstateToProps, mapDispatchToProps)(FlowersList);