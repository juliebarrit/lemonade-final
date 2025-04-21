import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useEffect } from 'react';

export default function HeroSection() {
  useEffect(() => {
    const content = document.querySelector('.hero-content');
    if (content) {
      content.classList.add('animate-fade-in');
    }
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `url("https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=1400&q=80") center/cover no-repeat`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Overlay for depth */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          background:
            'linear-gradient(to bottom right, rgba(0,0,0,0.4), rgba(0,0,0,0.7))',
          zIndex: 1,
        }}
      />

      {/* Glass Content */}
      <div
        className="hero-content"
        style={{
          zIndex: 2,
          maxWidth: '700px',
          padding: '3rem',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          backdropFilter: 'blur(15px)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          textAlign: 'center',
          animation: 'fadeIn 1.5s ease-out forwards',
          color: '#fff',
        }}
      >
        <h1
          style={{
            fontSize: '4rem',
            fontWeight: '900',
            color: '#ffdd57',
            marginBottom: '1rem',
            textShadow: '0 2px 5px rgba(0,0,0,0.4)',
          }}
        >
          Lemoniac
        </h1>
        <p
          style={{
            fontSize: '1.5rem',
            lineHeight: '1.8',
            color: '#f8f8f8',
            marginBottom: '2.5rem',
          }}
        >
          Bursting with citrusy sunshine, Lemoniac lemonade is your daily splash of joy. Drink happy. Drink bright.
        </p>

        <Link href="/products" passHref>
          <Button
            size="lg"
            className="glow-button"
            style={{
              padding: '0.9rem 2.5rem',
              fontSize: '1.2rem',
              fontWeight: '700',
              color: '#fff',
              backgroundColor: '#f4a261',
              border: 'none',
              borderRadius: '50px',
              transition: 'all 0.3s ease-in-out',
              animation: 'float 3s ease-in-out infinite',
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = '0 0 30px rgba(255,221,87,0.9)';
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = '0 0 20px rgba(244,162,97, 0.6)';
            }}
          >
            Explore Flavors
          </Button>
        </Link>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </div>
  );
}
