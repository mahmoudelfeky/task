import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { Icon, View } from "native-base";
import BASE_URL from "../../AppConfig";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";
export default class FavouriteIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: this.props.fav ,
            loading: false
        }
    }



    addToFav = async () => {
        const url = BASE_URL + `/users/${this.props.userId}/fav`

        var data = {
            method: this.state.color ? 'DELETE' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.token
            },
            body: JSON.stringify({
                'flower': this.props.flowerId
            })
        }; this.setState({
            color: this.state.color ?false : true
        })
        try {
            this.setState({
                loading: true
            })
            let response = await fetch(url, data)
            let responseJson = await response.json();
            if (response.ok) {
                console.log(`response`, responseJson)
                this.setState({
                    loading: false
                })

            }
            else {
                console.log(`failed`)
                this.setState({
                    color: this.props.fav ? true : false,
                    loading: false
                })
            }


        }
        catch (error) {
            console.log(`Error`, error)
            this.setState({
                color: this.state.color ? true : false,
                loading: false
            })

        }

    }

    render() {
        let loadingScreen = null;
        if (this.state.loading)
            loadingScreen = (<LoadingOverlay transparent={true} />)
        return (
            <View style={this.props.style}>

                <TouchableOpacity style={{ alignSelf: `center` }} onPress={() => this.addToFav()} >
                    <Icon name="md-star"
                        style={{ fontSize: 100, color: this.state.color? `yellow` :`black`  }} />
                </TouchableOpacity>
                {loadingScreen}
            </View>
        )
    }
}