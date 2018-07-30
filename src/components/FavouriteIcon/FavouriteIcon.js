import React ,  { Component } from "react";
import { TouchableOpacity } from "react-native";
import { Icon } from "native-base";
import BASE_URL from "../../AppConfig";
export default class FavouriteIcon extends Component{
    state = {
        color:`black`
    }



    addToFav = async() => {
        const url = BASE_URL + `/users/${this.props.userId}/fav`
        console.log(this.props.token)
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
    
                let response = await fetch(url, data)
                let responseJson = await response.json();
                if (responseJson.flowers) {
                    console.log(`response`, response)
                   
                }
                else
                {
                    console.log(`failed`)
                    this.setState({
                        color:`black`
                    })
                }
                
    
            }
            catch (error) {
               console.log(`Error`, error)
               this.setState({
                color:`black`
            })
               
            }
        
    }
    
    render(){
        return(
            <TouchableOpacity style = {{alignSelf:`center`}} onPress = {()=>this.addToFav()} >
            <Icon name="md-star" 
            style={{ fontSize: 100, color: this.props.fav?`yellow`: this.state.color}} />
            </TouchableOpacity>
        )
    }
}