"use client";
import { usePathname } from 'next/navigation';
import useStore from "../store/useStore";
import { useEffect, useState } from "react";
import styles from "../styles/Header.module.scss";
import DropdownMenu from "./DropdownMenu"; // Import CSS module

const Header = () => {
  const pathname = usePathname();
  const {wallet} = useStore();

  const [walletAddress, setWalletAddress] = useState('')

  useEffect(() => {
    setWalletAddress(wallet.address || '')
  }, [wallet])

  return (
    <div className={styles["header-container"]}>
      <div
        className={`container d-flex align-items-center justify-content-between ${styles["header-wrapper"]}`}
      >
        <div>
          <span className={styles["header-name"]}>stakestark_</span>
        </div>
        <div className={styles["links-and-wallets"]}>
          <div className={styles["menu-link"]}>
            <a className={`${pathname == '/home' ? styles.active : ''}`} href="/">Home</a>
            <a className={`${pathname == '/staking' ? styles.active : ''}`} href="/staking">Staking</a>
            <a className={`${pathname == '/faq' ? styles.active : ''}`} href="/faq">FAQs</a>
          </div>
          <div className={styles['account-info']}>
            {`${walletAddress.slice(0,5)}...${walletAddress.slice(-3)}`} <img src="/images/token-icon.svg" />
          </div>
        </div>
        <DropdownMenu className={styles['dropdown-menu']} />
      </div>
    </div>
  );
};
export default Header;
