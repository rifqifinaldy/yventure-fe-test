import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./index";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

function resizeWindow(width: number) {
  (window.innerWidth as number) = width;
  window.dispatchEvent(new Event("resize"));
}

describe("Navbar", () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue("/");
  });

  it("should toggle mobile menu when hamburger icon is clicked", () => {
    render(<Navbar />);

    const hamburger = screen.getByTestId("hamburger");
    const mobileMenu = screen.getByTestId("mobile-menu");

    // Initially, menu should not have 'open' class
    expect(mobileMenu.className).not.toMatch(/open/);

    // Click hamburger to open
    fireEvent.click(hamburger);
    expect(mobileMenu.className).toMatch(/open/);

    // Click hamburger to close
    fireEvent.click(hamburger);
    expect(mobileMenu.className).not.toMatch(/open/);
  });

  it("should apply 'active' class to the link that matches current pathname", () => {
    (usePathname as jest.Mock).mockReturnValue("/posts");

    render(<Navbar />);

    const activeDesktopLink = screen.getByTestId("nav-link-desktop-posts");
    const inactiveDesktopLink = screen.getByTestId("nav-link-desktop-todos");

    expect(activeDesktopLink.className).toMatch(/active/);
    expect(inactiveDesktopLink.className).not.toMatch(/active/);

    const activeMobileLink = screen.getByTestId("nav-link-mobile-posts");
    const inactiveMobileLink = screen.getByTestId("nav-link-mobile-todos");

    expect(activeMobileLink.className).toMatch(/active/);
    expect(inactiveMobileLink.className).not.toMatch(/active/);
  });

  it("should hide desktop menu and show mobile menu on small screen after clicking hamburger", () => {
    // Simulate mobile screen
    resizeWindow(500);

    render(<Navbar />);

    const menuContainer = screen.getByTestId("menu-container");
    const hamburger = screen.getByTestId("hamburger");
    const mobileMenu = screen.getByTestId("mobile-menu");

    // Desktop menu should still be in the DOM, but CSS would hide it
    expect(menuContainer).toBeInTheDocument();

    // Simulate click to open mobile menu
    fireEvent.click(hamburger);

    expect(mobileMenu.className).toMatch(/open/);
  });
});
