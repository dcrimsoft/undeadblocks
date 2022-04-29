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
import amateur_bg from './images/amateur_bg.PNG';
import survivor_bg from './images/survivor_bg.png';
import assassin_bg from './images/assassin_bg.png';
import z_killer from './images/z_killer.PNG';
import { messagePrefix } from "@ethersproject/hash";




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
									
									<div className="carousel-inner">              

								


										<div className="carousel-item active">
											<div className="the_images">
												<div className="card">
													<h5 className="card_title">AMATEUR</h5>
													
													<img className="ban_i" src={ amateur_bg } alt="amateur weapon loadout" />
													<div className="d_container">
														<h3 className="w_price" id="a_text" value="0.1">
															0.1 ETH
														</h3>
														<p className="w_det">
															<b>Knife + Pistol</b>
															<br />
															<b className="w_det1">Playable in game</b>
														</p>
														<button id="buy_amateur" className="noselect" onClick={ this.buyAmateur }>
															Buy Now
														</button>
														
													</div>
												</div>
											</div>
										</div>

										<div className="carousel-item">
											<div className="the_images">
												<div className="card">
													
													<h5 className="card_title">
														SURVIVOR
													</h5>
													<img className="ban_i" src={ survivor_bg } alt="survivor weapon loadout" id="surv_img" />
													<div className="d_container" id='surv_d'>
														<h3 className="w_price" id="survivor_text" >
															0.3 ETH
														</h3>
														<p className="w_det">
															<b>Knife + MP5 + Pistol</b>
															<br />
															<b className="w_det1">Playable in game</b>
														</p>
														<button id="buy_survivor" className="noselect">Buy Now</button>
														
													</div>
												</div>
											</div>
										</div>
										
										<div className="carousel-item">
											<div className="the_images">
												<div className="card">
													<h5 className="card_title">ASSASSIN</h5>
													<img className="ban_i" src={ assassin_bg } alt="assassin weapon loadout" />
													<div className="d_container" id="ass_d">
														<h3 className="w_price" id="assassin_text">
															0.5 ETH
														</h3>
														<p className="w_det">
															<b>Knife + AK47 + Pistol + Shotgun + 1 random perk</b>
															<br />
															<b className="w_det1">Playable in game</b>
														</p>
														<button id="buy_assassin" className="noselect">
															Buy Now
														</button>
														
													</div>
												</div>
											</div>
										</div>
										
										<div className="carousel-item">
											<div className="the_images">
												<div className="card">
													<h5 className="card_title">ZOMBIE KILLER</h5>
													<img className="ban_i" src={ z_killer } alt="zombie killer weapon loadout" />
													<div className="d_container" id="zombie_d">
														<h3 className="w_price" id="zkiller_text">
															1 ETH
														</h3>
														<p className="w_det">
															<b>Knife + F1 + Pistol + Shotgun + 4 perks + Grenade</b>
															<br />
															<b className="w_det1">Playable in game</b>
														</p>
														<button id="buy_zkiller" className="noselect">Buy Now</button>
														
													</div>
												</div>
											</div>
										</div>





										
									</div>
									<a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
										<span className="fa fa-chevron-left fa-lg" aria-hidden="true"></span>
										<span className="sr-only">Previous</span>
									</a>
									<a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
										<span className="fa fa-chevron-right fa-lg" aria-hidden="true"></span>
										<span className="sr-only">Next</span>
									</a>
								</div>
							</div>
							
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
