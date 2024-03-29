import React, { useState } from "react";
import "./tailwind-dist.css";
import "./app.css";
import { Home } from "./modules/home";
import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, NextUIProvider } from "@nextui-org/react";
import { useConfig } from "./context/ConfigContext";

function App() {
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const config = useConfig();

  return (
    <NextUIProvider>
      <div className="app flex flex-col">
        <Navbar onMenuOpenChange={setIsMenuOpen}>
          <NavbarContent>
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="sm:hidden"
            />
            <NavbarBrand>
              
              <p className="font-bold text-inherit">MONITOR</p>
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
              <Link color="foreground" href="#">
                Features
              </Link>
            </NavbarItem>
            <NavbarItem isActive>
              <Link href="#" aria-current="page">
                Customers
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="#">
                Integrations
              </Link>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem className="hidden lg:flex">
              <Link href="#">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="#" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </NavbarContent>
          <NavbarMenu className="z-50">
            {menuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={
                    index === 2
                      ? "primary"
                      : index === menuItems.length - 1
                      ? "danger"
                      : "foreground"
                  }
                  className="w-full"
                  href="#"
                  size="lg"
                >
                  {item}
                </Link>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
        </Navbar>
        <div className="flex h-max flex-1 items-center flex-col">
          <div className="flex z-40 max-w-[1024px] w-full h-auto items-center justify-center p-4">
            <Home />
          </div>
        </div>
        <div className="flex w-full h-auto items-center justify-center flex-col bg-primary pt-2 pb-2">
          <div className="flex z-40 max-w-[1024px] w-full h-auto items-center justify-center text-small text-white">
            {`v${config.version} (${config.env})`}
          </div>
        </div>
      </div>
    </NextUIProvider>
  );
}

export default App;
