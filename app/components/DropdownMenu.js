"use client";
import React from "react";
import { Dropdown, Button } from "react-bootstrap";
import Link from "next/link";
import useStore from "../store/useStore";
import { useEffect, useState } from "react";
import styles from "../styles/DropdownMenu.module.scss";
import { usePathname, useRouter } from "next/navigation";

const DropdownMenu = () => {
  const pathName = usePathname();
  const router = useRouter();

  return (
    <div className={styles["menu-dropdown-icon"]}>
      <Dropdown>
        <Dropdown.Toggle variant="link" className="text-decoration-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            viewBox="0 0 32 32"
            fill="#0F0B46"
          >
            <path
              d="M4 24V21.3333H28V24H4ZM4 17.3333V14.6667H28V17.3333H4ZM4 10.6667V8H28V10.6667H4Z"
              fill="#0F0B46"
            />
          </svg>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {pathName !== "/staking" && (
            <Dropdown.Item className="text-center">
              <Button
                  variant="primary"
                  className={styles["login-btn"]}
                  onClick={() => router.push('/staking')}
                >
                  Stake Now
                </Button>
            </Dropdown.Item>
          )}
          {pathName !== "/staking" && <Dropdown.Divider />}
          <Dropdown.Header className={styles["dropdown-item"]}>
            <Link href="/home" className={styles["menu-link"]}>
              Home
            </Link>
          </Dropdown.Header>
          <Dropdown.Header className={styles["dropdown-item"]}>
            <Link href="/staking" className={styles["menu-link"]}>
              Staking
            </Link>
          </Dropdown.Header>
          <Dropdown.Header className={styles["dropdown-item"]}>
            <Link href="/faq" className={styles["menu-link"]}>
              FAQs
            </Link>
          </Dropdown.Header>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DropdownMenu;
