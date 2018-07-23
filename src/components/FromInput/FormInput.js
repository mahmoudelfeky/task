import React, { Component } from 'react';
import { Container, Content, Item, Input, Icon } from 'native-base';
import { View, StyleSheet } from "react-native";
import ErrorMessage, { } from "../ErrorMessage/ErrorMessage";

export default class FormInput extends Component{
    handleChange = (value)=>{
        this.props.onChange(this.props.name,value)
    }
    handleTouch = ()=>{
        this.props.onTouch(this.props.name)
    }
render() {
    const {last , error,iconname , ...rest} = this.props
    return (<View>
        <Item last = {last}>
            <Icon name={iconname} style={styles.icon} />
            <Input {...rest}
             onBlur = {this.handleTouch}
             onChangeText = {this.handleChange}
            />


        </Item>
        {error&& <ErrorMessage msg = {error} />}
    </View>)
}
}

const styles = StyleSheet.create({
    icon:{
        color: `white` 
    }
})