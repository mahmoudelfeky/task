import React , { Component } from "react";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import { Container, Content , Button , Text } from 'native-base';
import CartItem from "../../components/CartItem/CartItem";
import BASE_URL from "../../AppConfig";
import { connect } from "react-redux";
import { getCart  , checkOut} from "../../store/actions/flowersActions";
class Orders extends Component {
    state = {
        flowers:[],
        totalPrice:0
    }
    componentDidMount(){
        this.props.onGetCart({
            userId:this.props.userId,
            token:this.props.token
          })
    }
 
    goBack = ()=>{
        this.props.navigator.pop({
            animated: true, // does the pop have transition animation or does it happen immediately (optional)
            animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
        });
    }

    renderOrders = ()=>{
       return  this.props.flowers.map(item=>{
           return <CartItem name ={item.flowerName} price = {item.price} 
           uri = {BASE_URL+`/`+item.flowerImage} desc = {item.description} key = {item._id+item.creationDate+Math.random()}/>
       })
    }
    render(){
        return(
        <Container>
         <CustomHeader  name="md-arrow-back" navigator={this.props.navigator}  color ="black" logo = {true} title="FlowersList" transparent = {true} buttonAction = {this.goBack} />
        <Content>
         {this.renderOrders()}
        </Content>
        <Button onPress = {()=>this.props.onCheckOut({
            userId:this.props.userId,
            token:this.props.token
        })}
        style ={{backgroundColor:"#3CB324"}} block>
          <Text uppercase={false}>PLACE ORDER</Text>
        </Button>
      </Container>);
       

    }
}
const mapDispatchToProps = dispatch=>{
    return{
        onGetCart:(values)=>dispatch(getCart(values)),
        onCheckOut:(values)=>dispatch(checkOut(values))
    }
}
const mapStateToProps = state=>{
    return{
        userId:state.user.user._id,
        token:state.user.token,
        flowers:state.flowers.flowers,
        totalPrice:state.flowers.totalPrice
    }
}
export default connect(mapStateToProps,mapDispatchToProps)( Orders)