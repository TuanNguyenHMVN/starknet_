"use client";
import "./styles/globals.scss";
import "./styles/custom.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { usePathname } from "next/navigation";
import Header from "./components/Header";
import Footer from "./components/Footer";
import styles from "./styles/custom.scss";
export default function RootLayout({ children }) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <head>
        <title>Stakestark_</title>
      </head>
      <body>
        <div className={styles["starknet-app"]}>
          {pathname != "/home" && <Header />}
          <div className="app-container container"
          >
            <main>{children}</main>
          </div>
          {pathname != "/home" && <Footer />}
        </div>
      </body>
    </html>
  );
}
