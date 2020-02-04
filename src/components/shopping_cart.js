import React, { Component } from 'react';
import { Box, Text, Button } from 'grommet';
import shopping_cart_api from '../config/shopping_cart_api'

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
        if ('cart' in window.localStorage) {
            fetch(`${shopping_cart_api[process.env.NODE_ENV]}/cart/${window.localStorage.cart.id}`)
                .then((res) => res.json())
                .then((res_json) => {
                    this.setState({
                        cart: res_json
                    })
                }).catch((err) => {
                    console.log(err);
                    this.setState({
                        error: true
                    })
                })

        } else {
            fetch(`${shopping_cart_api[process.env.NODE_ENV]}/cart`, {
                method: 'POST'
            })
                .then((res) => res.json())
                .then((res_json) => {
                    this.setState({
                        cart: res_json
                    })
                }).catch((err) => {
                    console.log(err);
                    this.setState({
                        error: true
                    })
                })

        }
        const items_obj = {}
        // convert items to object
        this.props.items.map((item) => {
            items_obj[item.id] = item
        })
        this.items_obj = items_obj
        // check if the items mapping is in the props
    }
    render() {
        if (this.state.error) {

            return <h1>Something went wrong.</h1>;
        }
        return (
            <Box
            >
                <Box>
                    <Text size="medium">Items</Text>
                    {(this.state.cart.items).map((key, value) => {
                        // this.props.items
                        return <Text size="small">{this.items_obj[key].description} x {value} </Text>
                    })}
                    <Text size="medium">Total : {this.state.cart.items.total}</Text>
                </Box>
            </Box>
        )
    }
}