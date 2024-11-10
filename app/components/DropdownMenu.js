import React from "react";
import { Dropdown, Button } from "react-bootstrap";
import useStore from "../store/useStore";
import { useEffect, useState } from "react";
import styles from "../styles/DropdownMenu.module.scss";

import { connect, disconnect } from "starknetkit"
import { WebWalletConnector } from "starknetkit/webwallet"
import { InjectedConnector } from "starknetkit/injected"
import { ArgentMobileBaseConnector } from "starknetkit-next/argentMobile"

const DropdownMenu = () => {
  const {userWallet, updateWallet} = useStore();

  const [walletAddress, setWalletAddress] = useState('')

  useEffect(() => {
    setWalletAddress(userWallet || '')
  }, [userWallet])

  const connectWallet = async () => {
    const { wallet, connectorData } = await connect({
      modalMode: "alwaysAsk",
      connectors: [
        new InjectedConnector({ options: { id: "argentX" } }),
        new InjectedConnector({ options: { id: "braavos" } }),
        new ArgentMobileBaseConnector({
          dappName: "StarkStake",
          url: window.location.hostname,
          chainId: "SN_SEPOLIA",
          icons: [],
        }),
        new WebWalletConnector(),
      ],
    })
    updateWallet(connectorData.account);
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
