"use client";
import { usePathname } from "next/navigation";
import useStore from "../store/useStore";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import styles from "../styles/Header.module.scss";
import DropdownMenu from "./DropdownMenu"; // Import CSS module

import { connect } from 'get-starknet'; // v4.0.0 min
import { WalletAccount } from 'starknet';

const Header = () => {
  const pathname = usePathname();
  const { userWallet, updateWallet, setWalletAccount } = useStore();

  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    setWalletAddress(userWallet.selectedAddress || "");
  }, [userWallet]);

  const connectWallet = async () => {
    const selectedWalletSWO = await connect({ modalMode: 'alwaysAsk', modalTheme: 'light' });
    const myWalletAccount = new WalletAccount({ nodeUrl: process.env.NEXT_PUBLIC_STARKNET_NODE_URL }, selectedWalletSWO);
    setWalletAccount({...myWalletAccount})
    updateWallet(selectedWalletSWO);
  }

  return (
    <header className={styles.header}>
      <nav className={`${styles["header-wrapper"]} navbar`}>
        <div className="logo">
          <text className={styles["logo_cls-1"]}>
            starkstake_
          </text>
        </div>
        <div className="menu-action">
          <ul className="nav-links">
              <li>
            <a href="/home" className={pathname === '/home' ? 'current-page' : ''}>
              Home
            </a>
          </li>
          <li>
            <a href="/staking" className={pathname === '/staking' ? 'current-page' : ''}>
              Staking
            </a>
          </li>
          <li>
            <a href="/faq" className={pathname === '/faq' ? 'current-page' : ''}>
              FAQ
            </a>
          </li>
            <li>
              {!walletAddress && <button className="cta-button" onClick={() => connectWallet()}>
              Connect Wallet
              </button>}
              {walletAddress && (
                <div className="cta-wallet-info-button">
                  <span>{`${walletAddress.slice(0, 5)}...${walletAddress.slice(
                    -3
                  )}`}</span>{" "}
                </div>
              )}
            </li>
          </ul>
          <div className="mobile-menu-icon">
            <DropdownMenu className={styles["dropdown-menu"]} />
          </div>
        </div>
      </nav>
      </header>
  );
};
export default Header;
