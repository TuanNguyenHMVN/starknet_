import React from "react";
import { Dropdown, Button } from "react-bootstrap";
import useStore from "../store/useStore";
import { useEffect, useState } from "react";
import styles from "../styles/DropdownMenu.module.scss";

const DropdownMenu = () => {
  const {wallet, updateWallet} = useStore();

  const [walletAddress, setWalletAddress] = useState('')

  useEffect(() => {
    setWalletAddress(wallet.address || '')
  }, [wallet])

  const connectWallet = async () => {
    if (window.starknet) {
      const starknet = window.starknet;
      await starknet.enable();
      updateWallet(starknet.account)
    } else {
      alert('Please install a Starknet wallet like Argent X');
    }
  };
  return (
    <div className={styles['menu-dropdown-icon']}>
      <Dropdown>
        <Dropdown.Toggle variant="link" className="text-decoration-none">
          <i className={`${styles['menu-dropdown-icon']} bi bi-list dropdown-icon`}></i>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>
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
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="/home">Home</Dropdown.Item>
          <Dropdown.Item href="/staking">Staking</Dropdown.Item>
          <Dropdown.Item href="/faq">FAQs</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DropdownMenu;
