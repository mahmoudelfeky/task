import React , { Component } from "react";
import CustomHeader from "../../components/CustomHeader/CustomHeader";

class Orders extends Component {
    goBack = ()=>{
        this.props.navigator.pop({
            animated: true, // does the pop have transition animation or does it happen immediately (optional)
            animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
        });
    }
    render(){
        return <CustomHeader  name="md-arrow-back" navigator={this.props.navigator}  color ="black" logo = {true} title="FlowersList" transparent = {true} buttonAction = {this.goBack} />

    }
}

export default Orders