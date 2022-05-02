import React, { Component, useState } from "react";
import { BigNumber, ethers } from "ethers";
import { BrowserRouter as Router, Routes, Switch, Route } from "react-router-dom";
import getWeb3 from "./getWeb3";
import Web3 from 'web3';
import "./App.css";
import logo from './images/home_logo.png';
import udb from './images/udb.png';
import add_icon from './images/add_icon.PNG';
//import MetaMaskLoginButton from 'react-metamask-login-button';
import WalletCard from './WalletCard';

import Marketplace from '../abis/Marketplace.json';
import Main from "./Main";




class App extends Component {
  	state = { storageValue: 0, web3: null, accounts: null, contract: null };

	async UNSAFE_componentWillMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }
	constructor (props) {
        super (props);
        this.state = {
            account: '',
            productCount: 0,
            products: [],
            loading: true
        };
		
    }
	
    async loadWeb3() {
        if (window.ethereum) {

			
            window.ethereum.autoRefreshOnNetworkChange = false;
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        }
        // legacy dapp browsers
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        }
        // non-dapp browsers ...
        else {
            window.alert("non-ethereum browser detected. consider trying metamask");
        }
    }

	
	async loadBlockchainData() {

        const web3 = window.web3;

        // load account
        const accounts =  await web3.eth.getAccounts();
        this.setState({ account: accounts[0] });
        const netId = await web3.eth.net.getId();
        const netData = Marketplace.networks[netId];

        if (netData) {
            const marketplace = web3.eth.Contract(Marketplace.abi, netData.address);
            this.setState({ marketplace });
            const productCount = await marketplace.methods.productCount().call();
            console.log(productCount);
            
            this.setState({ productCount });

            // load products
            for (var i = 1; i <= productCount; i++) {
                const product = await marketplace.methods.products(i).call();
                this.setState({
                    products: [...this.state.products, product]
                });
            }

            this.setState({ loading: false });
            console.log(this.state.products);
            console.log(marketplace);
        } else {
            window.alert("error! Marketplace contract not deployed to detected network");
        }
        
    }

	

	
  

  	render () {
		return (
				<div className="main_page">

					

					<nav className="navbar navbar-expand-lg navbar-light">
						<div className="container">
							<a className="navbar-brand" href="#">
								<img src={ logo }></img>
							</a>
							<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
								<span className="navbar-toggler-icon"></span>
							</button>

							<div className="collapse navbar-collapse" id="navbarSupportedContent">
								<ul className="navbar-nav ml-auto">
									<li className="nav-item active">
										<a className="nav-link" href="#">Home</a>
									</li>
									<li className="nav-item">
										<a className="nav-link" href="#">Features</a>
									</li>
									<li className="nav-item">
										<a className="nav-link" href="#">My Weapons</a>
									</li>
									<li className="nav-item">
										<a className="nav-link" href="#">Wagyu Games</a>
									</li>
									<li className="nav-item">
										<a className="nav-link" href="#"></a>
									</li>
								</ul>


								<WalletCard />
								
							</div>

							
							
						</div>
						
						
					</nav>


					<div className="m_content">


					<div className="c_slider">
							<div className="slider_d">
								<div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" data-interval="false">
						
						

						
                            { this.state.loading
                                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div> 
                                : <Main
                                    products={this.state.products}
                                    createProduct={this.createProduct}
                                    purchaseProduct={this.purchaseProduct} />
                            }


						</div>
							</div>
							
						</div>



					<div>
                

                                   
            </div>




					
						











						<div className="grid-container">
							<div className="item2 udb1">
								<img className="udb" src={ udb }></img>
							</div>
							<div className="item3">
								<h6>INTRODUCING THE WEAPONS MINTING GUIDE</h6>
								<p>
									Read our Medium guide and learn how minting works.
								</p>
							</div>
							<div className="item4">
								<button className="button" id="ra_btn">
									<span>Read Article </span>
								</button>
							</div>
						</div>

						<div className="me_weapons">
							<div className="header">
								<h1>My Weapons</h1>
								<p>
									Weapon loadouts found in your connected wallet will appear here.
								</p>
							</div>

							

							<div className="main">
								<div className="row">
									<div className="column" onClick={ scrollToTop }>
										<img className="icon_img" src={ add_icon }></img>                                
									</div>
									<div className="column" onClick={ scrollToTop }>
										<img className="icon_img" src={ add_icon }></img>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
		);
  	}

}



const scrollToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: "smooth"
	});
};


export default App;
