"use client";
import { usePathname } from "next/navigation";
import useStore from "../store/useStore";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import styles from "../styles/Header.module.scss";
import DropdownMenu from "./DropdownMenu"; // Import CSS module

import { connect, disconnect } from "starknetkit"
import { WebWalletConnector } from "starknetkit/webwallet"
import { InjectedConnector } from "starknetkit/injected"
import { ArgentMobileBaseConnector } from "starknetkit-next/argentMobile"


const Header = () => {
  const pathname = usePathname();
  const { userWallet, updateWallet, availableAmount } = useStore();

  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    setWalletAddress(userWallet || "");
  }, [userWallet]);

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
    console.log("🚀 ~ connectWal ~ wallet:", wallet)
    updateWallet(connectorData.account);
  }



  return (
    <div className={styles["header-container"]}>
      <div
        className={`container d-flex align-items-center justify-content-between ${styles["header-wrapper"]}`}
      >
        <div>
          <span className={styles["header-name"]}>
            <img src="/images/new-header.jpg"/>
          </span>
        </div>
        <div className={styles["links-and-wallets"]}>
          <div className={styles["menu-link"]}>
            <a
              className={`${pathname == "/home" ? styles.active : ""}`}
              href="/"
            >
              Home
            </a>
            <a
              className={`${pathname == "/staking" ? styles.active : ""}`}
              href="/staking"
            >
              Staking
            </a>
            <a
              className={`${pathname == "/faq" ? styles.active : ""}`}
              href="/faq"
            >
              FAQs
            </a>
          </div>
          {walletAddress && (
            <div className={styles["account-info"]}>
              {/* <span>{availableAmount} STRK</span> |{" "} */}
              <span>{`${walletAddress.slice(0, 5)}...${walletAddress.slice(
                -3
              )}`}</span>{" "}
            </div>
          )}
          {!walletAddress && (
            <Button
              variant="primary"
              className={styles["login-btn"]}
              onClick={() => connectWallet()}
            >
              Connect Wallet
            </Button>
          )}
        </div>
        <DropdownMenu className={styles["dropdown-menu"]} />
      </div>
    </div>
  );
};
export default Header;
