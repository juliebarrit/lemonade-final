import Link from 'next/link';
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function CustomNavbar() {
  const cartItems = useSelector((state) => state.cart.items);
  const [isClient, setIsClient] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const categories = [
    { name: 'Earrings', path: '/products/earrings' },
    { name: 'Necklaces', path: '/products/necklaces' },
    { name: 'Bracelets', path: '/products/bracelets' },
    { name: 'Rings', path: '/products/rings' },
  ];

  useEffect(() => {
    setIsClient(true); // Ensure this runs only on the client
  }, []);

  return (
    <div className="text-center mb-4">
      <Link href="/" passHref legacyBehavior>
        <a style={{ textDecoration: 'none' }}>
          <h1 className="mb-3" style={{ fontSize: '3rem', fontWeight: 'bold' }}>
            <span style={{ color: '#ff69b4', WebkitTextStroke: '1px black' }}>L</span>
            <span style={{ color: '#000', fontWeight: 'bold' }}>•</span>
            <span style={{ color: '#ffa500', WebkitTextStroke: '1px black' }}>S</span>
            <span style={{ color: '#000', fontWeight: 'bold' }}>•</span>
            <span style={{ color: '#32cd32', WebkitTextStroke: '1px black' }}>E</span>
          </h1>
        </a>
      </Link>
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <NavDropdown
                title="Jewelry"
                id="jewelry-dropdown"
                show={showDropdown}
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                {categories.map((category) => (
                  <NavDropdown.Item key={category.name}>
                    <Link href={category.path} passHref legacyBehavior>
                      <a style={{ textDecoration: 'none', color: 'inherit' }}>{category.name}</a>
                    </Link>
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
              <Link href="/sale" passHref legacyBehavior>
                <Nav.Link>🔥 On Sale</Nav.Link>
              </Link>
              <Link href="/cart" passHref legacyBehavior>
                <Nav.Link>
                  🛒 Cart{' '}
                  {isClient && cartItems.length > 0 && (
                    <Badge bg="secondary" className="ms-1">
                      {cartItems.length}
                    </Badge>
                  )}
                </Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
