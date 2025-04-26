import Image from "next/image";
import { Container, Row, Col, Button } from "react-bootstrap";
import heroImg from "/public/images/hero.png";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section 
      style={{ 
        backgroundColor: "#e98a41", // Orange background 
        padding: "3rem 0", 
        margin: "0",
      }}
    >
      <Container className="p-0">
        <div style={{
          display: "flex",
          backgroundColor: "transparent",
          borderRadius: "0",
          overflow: "hidden",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        }}>
          {/* Left side - Image */}
          <div style={{ 
            width: "340px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            backgroundColor: "#e98a41",
          }}>
            <div style={{ 
              width: '340px',
              height: '426px',
              position: 'relative',
              marginRight: "-1px", // Ensure no gap between image and white container
            }}>
              <Image
                src={heroImg}
                alt="L.S.E Accessories Barbie"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </div>
          
          {/* Right side - White content section */}
          <div style={{ 
            flex: "1",
            backgroundColor: "white", 
            padding: "2.5rem",
            borderTopRightRadius: "1rem",
            borderBottomRightRadius: "1rem",
          }}>
            <h1 
              style={{ 
                fontSize: '1.8rem',
                fontWeight: '700',
                marginBottom: '1rem',
                color: '#333'
              }}
            >
              Velkommen til L.S.E Accessories
            </h1>
            <p style={{ fontSize: '1rem', color: '#555', marginBottom: '1rem' }}>
              Her finder du et stort udvalg af håndlavede farverige, sjove og feminine smykker og accessories!
            </p>
            <p style={{ fontSize: '1rem', color: '#555', marginBottom: '1rem' }}>
              Husk at følge med på instagram, hvor der løbende vil være giveaways og en masse forskellige tilbud!
            </p>
            <p className="mb-4" style={{ fontSize: '1rem', color: '#555' }}>
              Happy Shopping! <span role="img" aria-label="flower">🌸</span>
            </p>
            <Link href="/products" passHref>
              <Button
                style={{
                  backgroundColor: "#e98a41",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  padding: "0.6rem 1.5rem",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  fontSize: "0.9rem"
                }}
              >
                ALLE PRODUKTER
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
