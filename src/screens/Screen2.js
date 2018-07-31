import React, { Component, version } from 'react';
import { Text, View, Dimensions, StyleSheet, Image, Button, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from 'recyclerlistview';

class Cell extends Component {
  render() {
    return <View {...this.props}>{this.props.children}</View>;
  }
}

export default class Screen2 extends Component {
  constructor(props) {
    super(props);

    const { width } = Dimensions.get('window');


    this._layoutProvider = new LayoutProvider(
      index => 1,
      (type, dim) => {
        switch (type) {
          case 1:
            dim.width = width;
            dim.height = 150;
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

    };
  }
  page = 1;
  componentDidMount() {
    const { page } = this.state;
    this.generateArray(page);

  }


  generateArray(page) {
    const url = `https://randomuser.me/api/?page=${page}&results=10`;
    this.setState({ loading: true, refrsh: false });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log("dataaaaaa", res);

        const dataProvider = new DataProvider((r1, r2) => r1.email !== r2.email);
        this.setState({

          dataProvider:
            page === 1 ?
              dataProvider.cloneWithRows(res.results)
              :
              dataProvider.cloneWithRows([...this.state.dataProvider.getAllData(), ...res.results]),

          loading: false,
          refrsh: false,
        })

      })
      .catch(error => {
        this.setState({ loading: false, refrsh: false });
      });
  }

  refreshArray() {
    const url = `https://randomuser.me/api/?page=1&results=2`;
    this.setState({ loading: false, refrsh: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log("dataaaaaa", res);

        const dataProvider = new DataProvider((r1, r2) => r1.email !== r2.email);
        this.setState({
          dataProvider: dataProvider.cloneWithRows(res.results),
          loading: false,
          refrsh: false,
        })

      })
      .catch(error => {
        this.setState({ loading: false, refrsh: false });
      });
  }

  _rowRenderer(type, data) {
    switch (type) {
      case 1:
        return (
          <Cell
            style={{
              margin: 10,
              padding: 10,
              backgroundColor: "#eee",
              flex: 1,
              borderColor: "grey",
              borderRadius: 5,
              borderWidth: 1,

            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: 80, height: 80, borderColor: "grey", }}>
                <Image
                  source={{ uri: data.picture.thumbnail }}
                  style={{ width: "100%", height: "100%", borderRadius: 40 }}
                />
              </View>
              <View style={{ marginLeft: 10, justifyContent: "space-between" }}>
                <Text>FirstName: {data.name.first}</Text>
                <Text>Gender: {data.gender}</Text>
                <Text>Phone: {data.phone}</Text>

              </View>
            </View>

          </Cell>
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

    return (
      <RecyclerListView
        layoutProvider={this._layoutProvider}
        dataProvider={this.state.dataProvider}
        rowRenderer={this._rowRenderer}
        renderFooter={this.renderFooter}
        onEndReached={this.handleListEnd}
        refreshControl={<RefreshControl refreshing={this.state.refrsh} onRefresh={() => this.refreshArray()} />}
      />

    );
  }
}
