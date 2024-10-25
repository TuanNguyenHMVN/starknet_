"use client";
import "./styles/globals.scss";
import "./styles/custom.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Your App Title</title>
      </head>
      <body>
        <div className="starknet-app">
          <Header />
          <div className="container app-container">
            <main>{children}</main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
