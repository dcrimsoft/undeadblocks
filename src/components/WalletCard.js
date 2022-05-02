
import React, { useState } from 'react';
import { ethers } from "ethers";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false


const WalletCard = () => {

    const [data, setdata] = useState({
        address: "",
        Balance: null,
    });

    var btn_text = "connect wallet";

    const connectWalletHandler = (e) => {
        e.preventDefault();
        try{
             // Asking if metamask is already present or not
            if (window.ethereum) {
        
                // res[0] for fetching a first wallet
                window.ethereum.request({ method: "eth_requestAccounts" })
                .then((res) => accountChangeHandler(res[0]));
            } else {
                alert("install metamask extension!!");
            }
        } catch(error) {
            alert(error);
        }
       
    }

    const accountChangeHandler = (account) => {
        // Setting an address data
        setdata({
            address: account,
        });
      
        // Setting a balance
        getUserBal(account);
    };

    const getUserBal = (address) => {
        // Requesting balance method
        window.ethereum.request({ 
            method: "eth_getBalance", 
            params: [address, "latest"] 
        }).then((balance) => {
            // Setting balance
            setdata({
                Balance: ethers.utils.formatEther(balance),
            });
            btn_text = data.Balance;
        });
    }

    const chainChangedHandler = () => {
        window.location.reload();
    }

    try {
        window.ethereum.on('accountsChanged', accountChangeHandler);
        window.ethereum.on('chainChanged', chainChangedHandler);
    } catch (err) {
        alert(err.msg);
    }
    


    if (data.Balance != null) {
        return (
        
                <div className="App">
 
  
                    <div className="text-center">                        
                        <span className='u_bal'><i className="fa fa-check"></i> Wallet Connected... Bal: {data.Balance} ETH</span>
                    </div>
                </div>
            
        ) 
    } else {
        return (
        
            <div>
    
                <button className="cybr-btn enableEthereumButton" onClick={ connectWalletHandler } variant='primary'>
                    {btn_text}
                    <span aria-hidden>_</span>
                    <span aria-hidden className="cybr-btn__glitch"></span>
                    <span aria-hidden className="cybr-btn__tag">R25</span>
                </button>
            </div>
        )
    }
    
};

export default WalletCard