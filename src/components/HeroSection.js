import { Button } from 'react-bootstrap';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <div
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=1400&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '8rem 1rem',
        color: '#333',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255,255,255,0.8)',
          padding: '2.5rem',
          borderRadius: '15px',
          display: 'inline-block',
          maxWidth: '700px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
        }}
      >
        <h1 style={{ fontSize: '3rem', fontWeight: '700', color: '#e5b700' }}>
          Lemoniac – Taste the Sun!
        </h1>
        <p style={{ fontSize: '1.3rem', color: '#444' }}>
          Freshly squeezed lemonade made with love, lemons and a splash of joy!
        </p>
        <Link href="/products" passHref>
          <Button size="lg" variant="warning" className="mt-4 fw-bold px-4 py-2">
            Shop Now 🍹
          </Button>
        </Link>
      </div>
    </div>
  );
}
