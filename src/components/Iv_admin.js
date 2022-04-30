import React, { Component } from 'react';
import Marketplace from '../abis/Marketplace.json';
import Web3 from 'web3';

class Iv_admin extends Component {
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

        this.createWeapon = this.createWeapon.bind(this);
    }

    createWeapon = (name, price, perks) => {
        this.setState({ loading: true });
        this.state.marketplace.methods.createProduct(name, price, perks).send({ from: this.state.account }).once('receipt', (receipt) => {
            this.setState({ loading: false });
        });
    }

    render () {
        return (
                <div className='adm_body' id="content">
                    

                    <div className='form_div'>
                        <div className='admin_title'>
                            <h3>Add Product</h3>
                        </div>
                    
                        <form onSubmit={ (event) => {
                            event.preventDefault()
                            const name = this.productName.value
                            const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
                            const perks = this.weaponPerks.value
                            this.createWeapon(name, price, perks);
                        } }>
                            <div className="form-group mr-sm-2">
                                <input
                                    id="productName"
                                    ref={(input) => { this.productName = input }}
                                    type="text"
                                    className="form-control"
                                    placeholder="weapon name"
                                    required />
                            </div>

                            <div className="form-group mr-sm-2">
                                <input
                                    id="productPrice"
                                    type="text"
                                    ref={(input) => { this.productPrice = input }}
                                    className="form-control"
                                    placeholder="weapon price (in ether)"
                                    required />
                            </div>

                            <div className="form-group mr-sm-2">
                                <input
                                    id="weaponPerks"
                                    type="text"
                                    ref={(input) => { this.weaponPerks = input }}
                                    className="form-control"
                                    placeholder="weapon perks"
                                    required />
                            </div>

                            <div className='add_btn'>
                                <button type="submit" id='btn-primary' className="btn btn-primary">
                                    Add Weapon
                                </button>
                            </div>

                            

                        </form>
                    </div>
                    
                </div>
        );
    }

}

export default Iv_admin;
