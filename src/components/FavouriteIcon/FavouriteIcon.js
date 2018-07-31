import React ,  { Component } from "react";
import { TouchableOpacity } from "react-native";
import { Icon, View } from "native-base";
import BASE_URL from "../../AppConfig";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";
export default class FavouriteIcon extends Component{
    state = {
        color:`black`,
        loading:false
    }



    addToFav = async() => {
        const url = BASE_URL + `/users/${this.props.userId}/fav`

            var data = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.props.token
                },
                body: JSON.stringify({
                    'flower': this.props.flowerId
                })
            }; this.setState({
                color:`yellow`
            })
            try {
                this.setState({
                    loading:true
                })
                let response = await fetch(url, data)
                let responseJson = await response.json();
                if (response.ok) {
                    console.log(`response`, responseJson)
                    this.setState({
                        loading:false
                    })
                   
                }
                else
                {
                    console.log(`failed`)
                    this.setState({
                        color:`black`,
                        loading:false
                    })
                }
                
    
            }
            catch (error) {
               console.log(`Error`, error)
               this.setState({
                color:`black`,
                loading:false
            })
               
            }
        
    }
    
    render(){
        let loadingScreen = null;
        if(this.state.loading)
        loadingScreen = (<LoadingOverlay transparent = {true}/>)
        return(
            <View>
               
            <TouchableOpacity style = {{alignSelf:`center`}} onPress = {()=>this.addToFav()} >
            <Icon name="md-star" 
            style={{ fontSize: 100, color: this.props.fav?`yellow`: this.state.color}} />
            </TouchableOpacity>
            {loadingScreen}
            </View>
        )
    }
}