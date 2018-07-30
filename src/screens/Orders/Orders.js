import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import CartItem from "../../components/CartItem/CartItem";
import BASE_URL from "../../AppConfig";
import { connect } from "react-redux";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
class Orders extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setDrawerEnabled({
            side: "left",
            enabled: false,
            screen: "Task.SideDrawer"
          });
        this.state = {
            loading: false,
            data: [],
            page: 1,
            pageCount: 1,
            error: null,
            refreshing: false,
            totalPrice:0
        };
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        console.log("Remote Request")
        const { page, seed } = this.state;
        const url = BASE_URL + `/users/${this.props.userId}/orders?page=${page}&limit=10`;
        this.setState({ loading: true });

        fetch(url, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + this.props.token
            }
        })
            .then(res => res.json())
            .then(res => {
                setTimeout(() => {
                    let data = res.orders.map(item => {
                        if(item.flowers[0] !== undefined)
                        return item.flowers[0]
                    })
                    let Prices = res.orders.map(item => {
                      
                        return item.totalPrice
                    })
                    let total = 0
                    for (var i=0; i<Prices.length; i++) {
                        total += Prices[i];
                    }
                    this.setState({
                        data: page === 1 ? data : [...this.state.data, ...data],
                        error: res.error || null,
                        loading: false,
                        refreshing: false,
                        pageCount:res.pageCount,
                        totalPrice:total
                    });
                }, 2000)

            })
            .catch(error => {

                console.log("Remote Request Error" + error)
                this.setState({ error, loading: false });
            });
    };

    handleRefresh = () => {
        this.setState(
            {
                page: 1,
                seed: this.state.seed + 1,
                refreshing: true
            },
            () => {
                this.makeRemoteRequest();
            }
        );
    };

    handleLoadMore = () => {
        this.setState(
            {
                page: this.state.page + 1
            },
            () => {
                if(this.state.page<=this.state.pageCount )
                this.makeRemoteRequest();
            }
        );
    };
    goBack = () => {
        this.props.navigator.pop({
            animated: true, // does the pop have transition animation or does it happen immediately (optional)
            animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
        });
    }


    renderFooter = () => {
        if (!this.state.loading) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        );
    };

    render() {
        return (
            <View style = {{flex:1}}>
          <CustomHeader  name="md-arrow-back" navigator={this.props.navigator}  color ="black" logo = {true} title="FlowersList" transparent = {true} buttonAction = {this.goBack} />
          <View style = {{width:"100%", paddingRight:20,paddingLeft:10, flexDirection:"row",justifyContent:"space-between"}} >
         <Text>ITEMS({this.state.data.length})</Text>
         <Text >Total:{this.state.totalPrice+""}</Text>
         </View>
            <FlatList
            style = {{flex:1}}
                data={this.state.data}
                renderItem={({ item }) => (
                    <CartItem name={item.flowerName} price={item.price}
                        uri={BASE_URL + `/` + item.flowerImage} desc={item.description} key={item._id + item.creationDate + Math.random()} />
                )}
                keyExtractor={item => Math.random().toString()+ Math.random().toString()}
                ListFooterComponent={this.renderFooter}
                onRefresh={this.handleRefresh}
                refreshing={this.state.refreshing}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={50}
            />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        userId: state.user.user._id,
        token: state.user.token
    }
}
export default connect(mapStateToProps, null)(Orders)