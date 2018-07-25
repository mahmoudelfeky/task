import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { connect } from "react-redux";
import { getFlowers, handleMore } from "../../store/actions/flowersActions";
import { ListItem, Left, Body, Right, Thumbnail, Text, SearchBar } from 'native-base';
import { Header } from "native-base";

import FastImage from 'react-native-fast-image'


class FlowersList extends Component {
  state = {
    page: 1,
    seed: 1,
    refreshing: false
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
  render() {

    return (
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
            <View style ={{flexDirection:"row",justifyContent:"space-between"}}>
            <ListItem  onPress={() => alert(item.email)}>
              <FastImage
              style = {styles.image}
                source={{ uri: item.picture.large }}
                resizeMode={'stretch'} />

            </ListItem>
            </View>
          )
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
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
    width: (Dimensions.get("window").width-80) / 2,
    height: 200,

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