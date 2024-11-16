import React from "react";
import { Dropdown, Button } from "react-bootstrap";
import useStore from "../store/useStore";
import { useEffect, useState } from "react";
import styles from "../styles/DropdownMenu.module.scss";

import { connect } from 'get-starknet'; // v4.0.0 min
import { WalletAccount } from 'starknet';

const DropdownMenu = ({isHomePage}) => {
  const {userWallet, updateWallet, setWalletAccount} = useStore();

  const [walletAddress, setWalletAddress] = useState('')

  useEffect(() => {
    setWalletAddress(userWallet.selectedAddress || '')
  }, [userWallet])

  const connectWallet = async () => {
    const selectedWalletSWO = await connect({ modalMode: 'alwaysAsk', modalTheme: 'light' });
    const myWalletAccount = new WalletAccount({ nodeUrl: process.env.NEXT_PUBLIC_STARKNET_NODE_URL }, selectedWalletSWO);
    setWalletAccount({...myWalletAccount})
    updateWallet(selectedWalletSWO);
  };
  return (
    <div className={styles['menu-dropdown-icon']}>
      <Dropdown>
        <Dropdown.Toggle variant="link" className="text-decoration-none">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width={32}
              height={32}
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M4 24V21.3333H28V24H4ZM4 17.3333V14.6667H28V17.3333H4ZM4 10.6667V8H28V10.6667H4Z"
                fill="#0F0B46"
              />
          </svg>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {!isHomePage && <Dropdown.Item>
            {walletAddress && <div className={styles['account-info']}>
              {`${walletAddress.slice(0,5)}...${walletAddress.slice(-3)}`}
            </div>}
            {!walletAddress && <Button
              variant="primary"
              className={styles['login-btn']}
              onClick={() => connectWallet()}
            >
              Connect Wallet
            </Button>}
          </Dropdown.Item>}
          {!isHomePage && <Dropdown.Divider />}
          <Dropdown.Item href="/home">Home</Dropdown.Item>
          <Dropdown.Item href="/staking">Staking</Dropdown.Item>
          <Dropdown.Item href="/faq">FAQs</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DropdownMenu;
