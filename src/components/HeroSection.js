import { Button } from 'react-bootstrap';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <div
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1656936632096-59fcacae533f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '8rem 1rem',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0,0,0,0.4)',
          padding: '2rem',
          borderRadius: '10px',
          display: 'inline-block',
        }}
      >
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>
          Refresh your day with our lemonades!
        </h1>
        <p style={{ fontSize: '1.5rem' }}>
          Natural, delicious, and delivered with care.
        </p>
        <Link href="/products" passHref>
          <Button size="lg" variant="light" className="mt-4 fw-bold">
            Shop Now
          </Button>
        </Link>
      </div>
    </div>
  );
}
