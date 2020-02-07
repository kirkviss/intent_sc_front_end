import React, { Component } from 'react';
import './App.css';
import { Grid, Grommet, Box, Text } from 'grommet';
import { grommet } from "grommet/themes";
import ShoppingCartComponent from './shopping_cart';
import ItemComponent from './items'
  ;

export default class App extends Component {

  constructor(props) {
    super(props);
    this.items = {}
    this.state = {
      error: false,
      items: [],
      items2: []
    }
  }

  componentDidMount() {
    // get all the items available 
    fetch(`/v0/items`)
      .then((res) => res.json())
      .then((res_json) => {

        this.setState({
          items: res_json,
          items2: res_json
        })
      }).catch((err) => {
        console.log(err);
        this.setState({
          error: true
        })
      })

    // creat a new shopping cart if no idea is found in local storage
    if (!('cartId' in window.localStorage)) {
      fetch(`/v0/cart`, {
        method: 'POST',
      })
        .then((res) => res.json())
        .then((cart) => {

          window.localStorage.setItem('cartId', cart.id);
        }).catch((err) => {
          console.log(err);
          this.setState({
            error: true
          })
        })
    }

  }

  render() {
    if (this.state.error) {

      return <h1>Something went wrong.</h1>;
    }
    return (
      <div className="component-app">
        <Grommet full theme={grommet}>
          <Grid
            areas={[
              { name: 'items', start: [0, 1], end: [0, 1] },
              { name: 'cart', start: [1, 1], end: [1, 1] }
            ]}
            fill
            rows={["auto", "flex"]}
            columns={["auto", "flex"]}
            gap='large'
          >
            {/* items component */}
            <Box
              gridArea='items'
              direction='column'
              pad='small'
            >
              <Box>
                <Text size="xxlarge">Items</Text>
              </Box>
              {(this.state.items).map((item) => {
                return <ItemComponent item={item} />
              })
              }
            </Box>
            
            {/* cart component */}
            <Box
              gridArea='cart'
              direction='column'
              pad='small'
            >
              <Box>
                <Text size="xxlarge">Shopping Cart</Text>
              </Box>
              <ShoppingCartComponent items={this.state.items2} />
            </Box>

          </Grid>
        </Grommet>
      </div>
    );
  }

}
