import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { connect } from "react-redux";
import { getFlowers, handleMore } from "../../store/actions/flowersActions";
import { ListItem, Left, Body, Right, Thumbnail, Text, SearchBar } from 'native-base';
import { Header } from "native-base";
import CustomHeader from "../../components/CustomHeader/CustomHeader";

import FastImage from 'react-native-fast-image'
const { width, height } = Dimensions.get('window');

const equalWidth = (width / 2 ) 

class FlowersList extends Component {
  state = {
    page: 1,
    seed: 1,
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
    this.props.onGetFlowers(this.state.seed, this.state.page, this.props.data);
  }


  handleRefresh = () => {
    this.setState({
      page: 1,
      refreshing: true,
      seed: this.state.seed + 1
    }, () => this.props.onGetFlowers(this.state.seed, this.state.page, this.props.data))

  }

  handleMore = () => {
    this.setState({
      page: this.state.page + 1
    }, () => this.props.onGetFlowers(this.state.seed, this.state.page, this.props.data))
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
     <CustomHeader name="md-arrow-back" navigator={this.props.navigator} cart ={true} color ="black" logo = {true} title="FlowersList" transparent = {true} buttonAction = {this.goBack} />
    {/* <Text>Flowers and bouquets</Text> */}
      <FlatList
        style={{ flex: 1 }}
        ItemSeparatorComponent={this.renderSeparator}
        data={this.props.data}
        keyExtractor={item => item.email}
        numColumns={2}
        ListFooterComponent={this.renderFooter}
        refreshing={this.props.refreshing}
        onRefresh={this.handleRefresh}
        onEndReached={this.handleMore}
        onEndReachedThreshold={.5}
        renderItem={({ item }) => {
          return (
         <TouchableOpacity onPress = {()=>this.startFlowerDetail({
           uri: item.picture.large,
           name:item.name.first,
           price:item.name.last})}>
            <View  style = {{flexDirection:"column" ,alignItems:"center"}}>
              <FastImage
              style = {styles.image}
                source={{ uri: item.picture.large }}
                resizeMode={'cover'} />
                <Text>name</Text>
                <Text>price</Text>

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
    onGetFlowers: (seed, page, data) => dispatch(getFlowers(seed, page, data)),
    onhandeleMore: (data) => dispatch(handleMore(data))
  }
}
const mapstateToProps = state => {
  return {
    loading: state.flowers.loading,
    data: state.flowers.data,
    page: state.flowers.page,
    seed: state.flowers.seed,
    error: state.flowers.error,
    refreshing: state.flowers.refreshing
  }
}
export default connect(mapstateToProps, mapDispatchToProps)(FlowersList);