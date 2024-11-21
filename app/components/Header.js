"use client";
import useStore from "../store/useStore";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/Header.module.scss";
import DropdownMenu from "./DropdownMenu"; // Import CSS module
import { usePathname } from "next/navigation";

const Header = () => {
  const { userWallet, connectWallet } = useStore();
  const pathname = usePathname();

  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    setWalletAddress(userWallet.selectedAddress || "");
  }, [userWallet]);

  return (
    <header className={styles.header}>
      <nav className={`${styles["header-wrapper"]} navbar`}>
        <div className="logo">
          <text className={styles["logo_cls-1"]}>starkstake_</text>
        </div>
        <div className="menu-action">
          <ul className="nav-links">
              <li>
            <Link href="/home" className={pathname === '/home' ? 'current-page' : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/staking" className={pathname === '/staking' ? 'current-page' : ''}>
              Staking
            </Link>
          </li>
          <li>
            <Link href="/faq" className={pathname === '/faq' ? 'current-page' : ''}>
              FAQ
            </Link>
          </li>
            <li>
              {!walletAddress && (
                <button className="cta-button" onClick={() => connectWallet()}>
                  Connect Wallet
                </button>
              )}
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
