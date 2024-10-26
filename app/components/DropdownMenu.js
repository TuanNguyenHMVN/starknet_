import React from "react";
import { Dropdown } from "react-bootstrap";
import useStore from "../store/useStore";
import { useEffect, useState } from "react";
import styles from "../styles/DropdownMenu.module.scss";

const DropdownMenu = () => {
  const {wallet} = useStore();

  const [walletAddress, setWalletAddress] = useState('')

  useEffect(() => {
    setWalletAddress(wallet.address || '')
  }, [wallet])
  return (
    <div className={styles['menu-dropdown-icon']}>
      <Dropdown>
        <Dropdown.Toggle variant="link" className="text-decoration-none">
          <i className={`${styles['menu-dropdown-icon']} bi bi-list dropdown-icon`}></i>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>
            <div className={styles['account-info']}>
              {`${walletAddress.slice(0,5)}...${walletAddress.slice(-3)}`} <img src="/images/token-icon.svg" />
            </div>
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
