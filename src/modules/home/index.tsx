import React, { useEffect, useState } from 'react';
import './home.css';
import { Artifact } from '../../components/artifact';
import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';

export const Home = () => {
  const [artifacts, setArtifacts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://api.monitor.altiacamp.com/info').then((response) => response.json()).then((data) => {
      setArtifacts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="home">
    <Navbar>
      <NavbarBrand>
 
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent className="sm:flex gap-4" justify="center">
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
    </Navbar>


      {loading && <div>Loading...</div>}
      {!loading && artifacts && Object.keys(artifacts).map((artifactKey : string) => 
        <Artifact key={artifactKey} artifact={artifacts[artifactKey]} />
      )}
      
    </div>
  );
}
