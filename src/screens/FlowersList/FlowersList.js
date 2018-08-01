import React, { Component, version } from 'react';
import { Text, View, Dimensions, StyleSheet, Image, Button,TouchableOpacity,
   FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from 'recyclerlistview';
import BASE_URL from "../../AppConfig";
import { connect } from "react-redux";
import CustomHeader from "../../components/CustomHeader/CustomHeader";

import FastImage from 'react-native-fast-image'
import FavouriteIcon from "../../components/FavouriteIcon/FavouriteIcon";
const image = require("../../assets/profileBg.jpg")
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";


class FlowersList extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setDrawerEnabled({
      side: "left",
      enabled: false,
      screen: "Task.SideDrawer"
    });
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    const { width } = Dimensions.get('window');


    this._layoutProvider = new LayoutProvider(
      index => 1,
      (type, dim) => {
        switch (type) {
          case 1:
            dim.width =Math.floor( width/2);
            dim.height = width*.75;
            break;
          default:
            dim.width = 0;
            dim.height = 0;
        }
      },
    );


    this.state = {
      // dataProvider2: this.generateArray(3000),
      dataProvider: new DataProvider(),
      loading: false,
      refrsh: false,
      clicked:false

    };
  }
  page = 1;
  componentDidMount() {
    const { page } = this.state;
    this.generateArray(this.page);

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


  generateArray(page) {
    const url = BASE_URL+`/flowers?page=${page}&limit=10&sponsored=${this.props.Sponsored}`
    this.setState({ loading: true, refrsh: false });
    fetch(url,{
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + this.props.token
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log("dataaaaaa", res);

        const dataProvider = new DataProvider((r1, r2) => r1._id !== r2._id);
        this.setState({

          dataProvider:
            page === 1 ?
              dataProvider.cloneWithRows(res.flowers)
              :
              dataProvider.cloneWithRows([...this.state.dataProvider.getAllData(), ...res.flowers]),

          loading: false,
          refrsh: false,
        })

      })
      .catch(error => {
        this.setState({ loading: false, refrsh: false });
      });
  }

  refreshArray() {
    const url = BASE_URL+`/flowers?page=1&limit=10&sponsored=${this.props.Sponsored}`
    console.log(url)
    this.setState({ loading: false, refrsh: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {

     let data = [];
        while(res.flowers) data.push(res.flowers.splice(0,2));
        // console.log(data)


        const dataProvider = new DataProvider((r1, r2) => r1._id !== r2._id);
        this.setState({
          dataProvider: dataProvider.cloneWithRows(data),
          loading: false,
          refrsh: false,
        })

      })
      .catch(error => {
        console.log(error)
        this.setState({ loading: false, refrsh: false });
      });
  }
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
  rederRow = (item)=>{
    // return row.map(item=>{
      
      let imageUri = BASE_URL + `/` + item.flowerImage;
      return(
        <TouchableOpacity key = {Math.random().toString()} style = {{flex:1}} onPress={() => this.startFlowerDetail({
          uri: imageUri,
          flowerId: item._id,
          name: item.flowerName,
          price: item.price
        })}>

           <View style={{ flexDirection: "column",
            alignItems: "center" ,
            margin: 10,
            marginTop:40,
           backgroundColor:"grey",
            flex: 1,
            borderRadius: 5,
            
            }}>
                <FastImage
                  style={styles.image}
                  source={{uri:imageUri}}
                  resizeMode={'cover'}/>
                   <FavouriteIcon style = {{position:`absolute` ,alignSelf:"flex-end"}} fav = {item.isFav} userId = {this.props.userId} token = {this.props.token} flowerId = {item._id} />
               
                <Text>{item.flowerName}</Text>
                <Text>{item.price}</Text>

              </View>

        </TouchableOpacity>
      )
      
    // })
  }
  _rowRenderer = (type, data)=> {
    // console.log(data,type)
    switch (type) {
      case 1  :
     
        return (
          <View style = {{flex:1,flexDirection:"row"}}>
          
          {this.rederRow(data)}
          </View>
        );
      default:
        return null;
    }
  }

  handleListEnd = () => {

    this.page++;
    this.generateArray(this.page);
  }
  renderFooter = () => {
    return (
      this.state.loading ?
        <ActivityIndicator
          style={{ margin: 10 }}
          size="large"
          color={'black'}
        /> : null
    )
  }
  render() {
    let loadingScreen = this.state.clicked?<LoadingOverlay/>:null;
    return (
      <View style={styles.container}>
     
     <CustomHeader notif={this.props.notif} name="md-arrow-back" navigator={this.props.navigator} cart={true} color="black" logo={true} title="FlowersList" transparent={true} buttonAction={this.goBack} />

      <RecyclerListView
        layoutProvider={this._layoutProvider}
        dataProvider={this.state.dataProvider}
        rowRenderer={this._rowRenderer}
        renderFooter={this.renderFooter}
        onEndReached={this.handleListEnd}
        refreshControl={<RefreshControl refreshing={this.state.refrsh} onRefresh={() => this.refreshArray()} />}
      />
       {loadingScreen}
</View>
    );
  }
}
const mapstateToProps = state => {
  return {
    notif: state.flowers.counter,
    token: state.user.token,
    userId: state.user.user._id
  }
}

const imageMarign = 5;
const styles = StyleSheet.create({
  container: {
    width:`100%`,
    height:`100%`
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
    width: `100%`,
    height: 200,
    margin: imageMarign

  }
})
export default connect(mapstateToProps, null)(FlowersList);
