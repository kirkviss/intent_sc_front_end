import React, { Component } from 'react';
import { Box, Text, Button } from 'grommet';

export default class ItemComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            error: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        // add item to cart
        fetch(`/v0/cart/${window.localStorage.cartId}/${this.props.item.id}`,
            {
                method: 'PUT'
            })
            .then((res) => res.json())
            .then((res_json) => {
                window.localStorage.setItem('cartId', res_json.id);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            })
        this.setState({})
    }

    componentDidMount() {
        // check if item is part of props
        if (!('item' in this.props)) {
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
                padding='large'
                direction='row'
            >
                <Box>
                    <Text size="medium"> {this.props.item.description} ({this.props.item.id})</Text>
                    <Text size="medium"> ${this.props.item.unit_price}</Text>
                </Box>

                <Box align="center" pad="medium">
                    <Button label="ADD TO CART" onClick={this.handleClick} />
                </Box>
            </Box>
        )

    }
}