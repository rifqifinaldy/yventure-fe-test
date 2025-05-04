"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Use `usePathname` from next/navigation
import styles from "./style.module.scss";
import { NAV_MENU } from "@app/libs/utilities/constant/navigation.constant";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const pathname = usePathname(); // Use the pathname to determine the active route

  return (
    <nav className={styles.navbar}>
      <div>
        <h1 className={styles.app_name}>Y Ventures Entry Test</h1>
        <h6 className={styles.info_text}>By Rifqi Finaldy</h6>
      </div>
      <div className={styles.menu_container}>
        {NAV_MENU.map((menu) => (
          <Link
            key={menu.id}
            href={menu.path}
            className={`${styles.menu_item} ${
              pathname === menu.path ? styles.active : ""
            }`} // Highlight active link based on pathname
          >
            {menu.label}
          </Link>
        ))}
      </div>
      {/* Hamburger Icon */}
      <div
        className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ""}`}
        onClick={toggleMobileMenu}
      >
        &#9776;
      </div>
      {/* Mobile Menu */}
      <div
        className={`${styles.mobile_menu} ${
          isMobileMenuOpen ? styles.open : ""
        }`}
      >
        <h6>Menu</h6>
        {NAV_MENU.map((menu) => (
          <Link
            key={menu.id}
            href={menu.path}
            className={`${styles.menu_item} ${
              pathname === menu.path ? styles.active : ""
            }`} // Highlight active link based on pathname
            onClick={toggleMobileMenu}
          >
            {menu.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
