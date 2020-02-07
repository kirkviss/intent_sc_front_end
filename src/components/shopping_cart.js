import React, { Component } from 'react';
import { Box, Text } from 'grommet';
// import shopping_cart_api from '../config/shopping_cart_api'

export default class ShoppingCartComponent extends Component {
    constructor(props) {
        super(props);
        this.items_obj = {};
        this.state = ({
            cart: {
                items: {},
                total: 0
            },
            error: false
        });
    }
    
    componentDidMount() {

        fetch(`/v0/cart/${window.localStorage.cartId}`)
        .then((res) => res.json())
        .then((cart) => {
          this.setState({
            cart: {
                items: cart['items'],
                total: cart['total']
            }
        })
        }).catch((err) => {
          console.log(err);
          window.localStorage.removeItem('cartId')
          this.setState({
            error: true
          })
        })

    }
    render() {
        if (this.state.error) {

            return <h1>Something went wrong.</h1>;
        }
                // convert items to object
        var items_obj = {};
        (this.props.items).forEach(element => {
            
            items_obj[element.id] = {
                id: element.id,
                description: element.description,
                unit_price: element.unit_price
            }
        });
        // let test = (this.state.cart.items? this.state.cart.items: {})
        return (
            
            <Box>
                <Box>
                    <Text size="medium">Items: </Text>
                    {Object.keys((this.state.cart.items? this.state.cart.items: {})).map((key) => {
                    
                        return <Text size="large">{key} x {this.state.cart['items'][key]} </Text>
                    })}
                    <Text size="medium">Total : {this.state.cart.total}</Text>
                </Box>
            </Box>
        )
    }
}