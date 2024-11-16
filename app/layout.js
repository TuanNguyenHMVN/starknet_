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
      <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>starkstake_</title>
    <meta property="og:title" content="starkstake_" />
    <meta property="og:description" content="Experience seamless liquid staking with stakestark_. Maximize your rewards, retain liquidity, and unlock the power of DeFi. Stake STRK, receive stSTRK, and trade anytime—powered by Starknet." />
    <meta property="og:image" content="https://stakestark.com/images/logo.svg" />
    <meta property="og:url" content="https://starkstake.com" />
    <meta property="og:type" content="website" />

    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />


    <link rel="icon" type="image/svg+xml" href="images/SN-Symbol-Flat colour.svg" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/ScrollTrigger.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/MotionPathPlugin.min.js"></script>
      </head>
      <body>
        <div className={styles["starknet-app"]}>
          {pathname != "/home" && <Header />}
          <div className={`${pathname != "/home" ? "app-container container" : ""} `}
          >
            <main>{children}</main>
          </div>
          {pathname != "/home" && <Footer />}
        </div>
      </body>
    </html>
  );
}
