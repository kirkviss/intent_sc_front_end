import React, { Component } from 'react';
import shopping_cart_api from '../config/shopping_cart_api'
import './App.css';
import { Grid, Grommet, Box, Text } from 'grommet';
import { grommet } from "grommet/themes";
import ShoppingCartComponent from './shopping_cart';
import ItemComponent from './items'
;

export default class App extends Component{

  constructor(props) {
    super(props);
    this.items = {}
    this.state = {
      error: false,
      items: []
    }
  }

  componentDidMount() {
    // get all the items available 
    fetch(`${shopping_cart_api[process.env.NODE_ENV]}/items`)
      .then((res) => res.json())
      .then((res_json) => {
        this.setState({
          items: res_json
        })
      }).catch((err) => {
        console.log(err);
        this.setState({
          error: true
        })
      })
  }
  render() {
    if (this.state.error) {
      
      return <h1>Something went wrong.</h1>;
    }
    return (
      <div className="component-app">
        <Grommet full theme={grommet}>
          {/* <Grid
            fill
            row={['auto', 'flex']}
            columns={['auto', 'flex']}
            areas={[
              { name: 'items', start: [0, 1], end: [0, 1] },
              { name: 'cart', start: [1, 1], end: [1, 1] }
            ]}
          > */}
            <Box
              gridArea='items'
              direction='row'
              justify='between'
              pad='large'
            > 
              <Text size="medium">Items</Text>
              {(this.state.items).map((item) => {
                return <ItemComponent item={item} />
              })
              }
            </Box>
            <Box
              gridArea='cart'
              direction='row'
              justify='between'
              pad='large'
            >
              <Text size="medium">Shopping Cart</Text>
              <ShoppingCartComponent items={this.state.items}/> 
            </Box>

          {/* </Grid> */}
        </Grommet>
      </div>
    );
  }

}
