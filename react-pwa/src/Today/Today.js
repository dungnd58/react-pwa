import React, { Component } from 'react';
import './Today.css';
import axios from 'axios';

const apiKey = "&api_key=e09d00e12871d3af53e6a3b507f8eff2b65eda9f4eb4fcfba5b21eeb2c4ab9e0";

class Today extends Component {
    // Adds a class constructor that assigns the initial state values:
    constructor () {
        super();
        this.state = {
            btcprice: '',
            ltcprice: '',
            ethprice: ''
        };
    }
    // This is called when an instance of a component is being created and inserted into the DOM.
    componentWillMount () {
        axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD${apiKey}`)
            .then(response => {
                // We set the latest prices in the state to the prices gotten from Cryptocurrency.
                this.setState({ 
                    btcprice: response.data.BTC.USD,
                    ethprice: response.data.ETH.USD,
                    ltcprice: response.data.LTC.USD
                });
            })
            // Catch any error here
            .catch(error => {
                console.log(error)
            })
    }
    // The render method contains the JSX code which will be compiled to HTML.
    render() {
        let {btcprice, ethprice, ltcprice} = this.state;
        return (
            <div className="today--section container">
                <h2>Current Price</h2>
                <div className="columns today--section__box">
                    <div className="column btc--section">
                        <h5>${btcprice}</h5>
                        <p>1 BTC</p>
                    </div>
                    <div className="column eth--section">
                        <h5>${ethprice}</h5>
                        <p>1 ETH</p>
                    </div>
                    <div className="column ltc--section">
                        <h5>${ltcprice}</h5>
                        <p>1 LTC</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Today;