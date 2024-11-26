"use client";
import useStore from "../store/useStore";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/Header.module.scss";
import DropdownMenu from "./DropdownMenu";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const { userWallet, connectWallet } = useStore();
  const router = useRouter();
  const pathname = usePathname();

  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    setWalletAddress(userWallet.selectedAddress || "");
  }, [userWallet]);

  return (
    <header className={styles.header}>
      <nav className={`${styles["header-wrapper"]} navbar`}>
        <div className="logo">
        <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1931.57 462.75"
              width="323px"
              height="auto"
              fill="#0F0B46"
            >
              <text className={styles["logo_cls-1"]} transform="translate(300 300)">
                starkstake_
              </text>
            </svg>
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
                <button className="cta-button" onClick={() => pathname !== "/home" ? connectWallet() : router.push("/staking")}>
                  {pathname !== "/home" ? "Connect Wallet" : "Stake Now"}
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
