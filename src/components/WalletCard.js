
import React, { useState } from 'react';
import { ethers } from "ethers";

const WalletCard = () => {

    var { errMsg, setErrMsg } = useState(null);
    var { defAcc, setDefAcc } = useState(null);
    var { userBal, setUserBal } = useState(null);
    

    const connectWalletHandler = () => {
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
            .then (result => {
                accountChangeHandler(result[0])
            })
        } else {
            setErrMsg = 'ERROR: MetaMask not installed/enabled'
            alert(setErrMsg);
        }
    }

    const accountChangeHandler = (newAccount) => {
        setDefAcc(newAccount);
        getUserBal(newAccount);
    }

    const getUserBal = (address) => {
        window.ethereum.request({ method: 'eth_getBalance', params: [address, 'latest'] })
        .then (balance => {
            setUserBal(ethers.utils.formatEther(balance));
        })
    }

    const chainChangedHandler = () => {
        window.location.reload();
    }

    window.ethereum.on('accountsChanged', accountChangeHandler);
    window.ethereum.on('chainChanged', chainChangedHandler);

    return (
        <div>

            <button className="cybr-btn enableEthereumButton" onClick={ connectWalletHandler }>
                Connect Wallet
                <span aria-hidden>_</span>
                <span aria-hidden className="cybr-btn__glitch"></span>
                <span aria-hidden className="cybr-btn__tag">R25</span>
            </button>
        </div>
    )
};

export default WalletCard