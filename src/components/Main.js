import React, { Component } from 'react';
import amateur_bg from './images/amateur_bg.PNG';
import Marketplace from '../abis/Marketplace.json';
import Web3 from 'web3';


class Main extends Component {

    state = { storageValue: 0, web3: null, accounts: null, contract: null };

    async UNSAFE_componentWillMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
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

    constructor (props) {
        super (props);
        this.state = {
            account: '',
            productCount: 0,
            products: [],
            loading: true
        };

        this.purchaseProduct = this.purchaseProduct.bind(this);
    }

    purchaseProduct = (id, price) => {
        this.setState({ loading:true });
        this.state.marketplace.methods.purchaseProduct(id).send({ from: this.state.account, value: price }).once('receipt', (receipt) => {
			this.setState({ loading: false });
		});
    }

    render () {
        return (
            <div id="content">
                

                <div className="c_slider">
					<div className="slider_d">
						<div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" data-interval="false">
                                
									<div className="carousel-inner">              

								
                                    { this.props.products.map((product, key) => {
                                        var p_class;
                                        if (product.id.toString() === "1") {
                                            p_class = "carousel-item active";
                                        } else {
                                            p_class = "carousel-item";
                                        }

                                    return (

										<div key={key} className={ p_class }>
											<div className="the_images">
												<div className="card">
                                                    <span className='id_span'>
                                                    {product.id.toString()}
                                                    </span>
													<h5 className="card_title">{ product.name }</h5>
													
													<img className="ban_i" src={ amateur_bg } alt="amateur weapon loadout" />
													<div className="d_container">
														<h3 className="w_price" id="a_text" value="0.1">
                                                            {window.web3.utils.fromWei(product.price.toString(), 'Ether')} ETH
														</h3>
														<p className="w_det">
															<b>Knife + Pistol</b>
															<br />
															<b className="w_det1">Playable in game</b>
														</p>
														<button 
                                                            className="btn btn1"
                                                            name={product.id}
                                                            value={product.price}
                                                            onClick={ (event) => {
                                                                this.purchaseProduct(event.target.name, event.target.value)
                                                            } }
                                                        >
                                                            Buy Now
                                                        </button>
														
													</div>
												</div>
											</div>
										</div>
										)
                                    }) }
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

            </div>
        );
    }

}

export default Main;
