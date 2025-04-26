import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

export default function AnnouncementBanner() {
  const announcements = [
    'En verden af pink & plastik',
    'Alle køb over 200 DKK får gratis fragt & 3 hemmelige små gaver med deres ordre!'
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Auto-rotate announcements every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="announcement-banner">
      <Container className="d-flex justify-content-center align-items-center py-2">
        <div className="announcement-text text-center">
          {announcements[currentIndex]}
        </div>
      </Container>
      
      <style jsx>{`
        .announcement-banner {
          background-color: #ff77a3; /* Updated pink color */
          color: #fff;
          font-weight: 500;
          width: 100%;
        }
        
        .announcement-text {
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}
