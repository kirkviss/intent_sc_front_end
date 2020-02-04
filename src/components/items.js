import React, { Component } from 'react';
import { Box, Text, Button } from 'grommet';
import shopping_cart_api from '../config/shopping_cart_api'

export default class ItemComponent extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            error: false
        }
    }

    addItemToCart() {
        fetch(`${shopping_cart_api[process.env.NODE_ENV]}/cart/${window.localStorage.cart.id}?itemId=${this.props.item.id}`,
            {
                method: 'PUT'    
            }
        )
        .then((res)=> res.json())
        .then((res_json)=>{
            window.localStorage.cart = res_json
        }).catch((err)=> {
            console.log(err);
        })
    }
    componentDidMount() {
        // check if item is part of props
        if (! ('item' in this.props)) {
            this.setState({
                error: true
            })
        }
    }

    render() {
        if (this.state.error) {
  
            return <h1>Something went wrong.</h1>;
        }
        return (
            <Box
                plain
            >
                <Box>
                    <Text size="medium"> {this.props.item.description}</Text>
                    <Text size="medium"> {this.props.item.unit_price}</Text>
                </Box>
                <Button onClick={this.addItemToCart()}>
                    <Box>
                        <Text size="large">ADD TO CART</Text>
                    </Box>
                </Button>
            </Box>
        )

    }
}