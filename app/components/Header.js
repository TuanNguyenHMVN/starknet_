"use client";
import { usePathname } from "next/navigation";
import useStore from "../store/useStore";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import styles from "../styles/Header.module.scss";
import DropdownMenu from "./DropdownMenu"; // Import CSS module

const Header = () => {
  const pathname = usePathname();
  const { wallet, updateWallet, availableAmount } = useStore();

  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    setWalletAddress(wallet.address || "");
  }, [wallet]);

  const connectWallet = async () => {
    if (window.starknet) {
      const starknet = window.starknet;
      await starknet.enable();
      updateWallet(starknet.account);
    } else {
      alert("Please install a Starknet wallet like Argent X");
    }
  };

  return (
    <div className={styles["header-container"]}>
      <div
        className={`container d-flex align-items-center justify-content-between ${styles["header-wrapper"]}`}
      >
        <div>
          <span className={styles["header-name"]}>
            <img src="/images/header_logo.svg"/>
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
              <span>{availableAmount} STRK</span> |{" "}
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
