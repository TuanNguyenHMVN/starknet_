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
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1931.57 366.84">
            <defs>
              <style
                dangerouslySetInnerHTML={{
                  __html:
                    `@font-face {font-family: 
                      'Adolfine Bold
                      src: url('../fonts/Adolfine/Adolfine Bold.woff') format('woff');
                      font-weight: 700;}\n                
                      .logo_cls-1 {\n                  
                        font-size: 342.74px;\n                  
                        fill: #150956;\n                  
                        font-family:'Adolfine Bold';\n                  
                        font-weight: 700;\n                
                      }`
                }}
              />
            </defs>
            <text className="logo_cls-1" transform="translate(3.05 294.21)">
              starkstake_
            </text>
          </svg>
        </div>
        <div className="menu-action">
          <ul className="nav-links">
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/staking">Staking</a>
            </li>
            <li>
              <a href="/faq">FAQs</a>
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
    // <div className={styles["header-container"]}>
    //   <div
    //     className={`container d-flex align-items-center justify-content-between ${styles["header-wrapper"]}`}
    //   >
    //     <div>
    //       <span className={styles["header-name"]}>
    //         <img src="/images/new-header.jpg"/>
    //       </span>
    //     </div>
    //     <div className={styles["links-and-wallets"]}>
    //       <div className={styles["menu-link"]}>
    //         <a
    //           className={`${pathname == "/home" ? styles.active : ""}`}
    //           href="/"
    //         >
    //           Home
    //         </a>
    //         <a
    //           className={`${pathname == "/staking" ? styles.active : ""}`}
    //           href="/staking"
    //         >
    //           Staking
    //         </a>
    //         <a
    //           className={`${pathname == "/faq" ? styles.active : ""}`}
    //           href="/faq"
    //         >
    //           FAQs
    //         </a>
    //       </div>
    //       {walletAddress && (
    //         <div className={styles["account-info"]}>
    //           {/* <span>{availableAmount} STRK</span> |{" "} */}
    //           <span>{`${walletAddress.slice(0, 5)}...${walletAddress.slice(
    //             -3
    //           )}`}</span>{" "}
    //         </div>
    //       )}
    //       {!walletAddress && (
    //         <Button
    //           variant="primary"
    //           className={styles["login-btn"]}
    //           onClick={() => connectWallet()}
    //         >
    //           Connect Wallet
    //         </Button>
    //       )}
    //     </div>
    //     <DropdownMenu className={styles["dropdown-menu"]} />
    //   </div>
    // </div>
  );
};
export default Header;
