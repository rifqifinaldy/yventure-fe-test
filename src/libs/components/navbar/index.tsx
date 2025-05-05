"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./style.module.scss";
import { NAV_MENU } from "@app/libs/utilities/constant/navigation.constant";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <div>
        <h1 className={styles.app_name}>Y Ventures Entry Test</h1>
        <h6 className={styles.info_text}>By Rifqi Finaldy</h6>
      </div>
      <div data-testid="menu-container" className={styles.menu_container}>
        {NAV_MENU.map((menu) => (
          <Link
            key={menu.id}
            data-testid={`nav-link-desktop-${menu.label.toLowerCase()}`}
            href={menu.path}
            className={`${styles.menu_item} ${
              pathname === menu.path ? styles.active : ""
            }`}
          >
            {menu.label}
          </Link>
        ))}
      </div>
      {/* Hamburger Icon */}
      <div
        data-testid="hamburger"
        className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ""}`}
        onClick={toggleMobileMenu}
      >
        &#9776;
      </div>
      {/* Mobile Menu */}
      <div
        data-testid="mobile-menu"
        className={`${styles.mobile_menu} ${
          isMobileMenuOpen ? styles.open : ""
        }`}
      >
        <h6>Menu</h6>
        {NAV_MENU.map((menu) => (
          <Link
            key={menu.id}
            href={menu.path}
            data-testid={`nav-link-mobile-${menu.label.toLowerCase()}`}
            className={`${styles.menu_item} ${
              pathname === menu.path ? styles.active : ""
            }`}
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
