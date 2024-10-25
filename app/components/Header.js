import styles from "../styles/Header.module.scss";
import DropdownMenu from "./DropdownMenu"; // Import CSS module

export default function Header() {
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
            <a href="/">Home</a>
            <a href="/staking">Staking</a>
            <a href="/faq">FAQs</a>
          </div>
        </div>
        <DropdownMenu />
      </div>
    </div>
  );
}
// "container header-wrapper d-flex align-items-center justify-content-between"
