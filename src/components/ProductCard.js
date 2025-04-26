import React, { useState } from 'react';

export default function ProductCard({ product, showToast }) {
  const [hovered, setHovered] = useState(false);

  // Ensure product has valid image 
  const productImage = product.image || '/images/placeholder.jpg';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="product-card" 
    >
      <div className="product-image-container">
        <div className="image-wrapper">
          <img
            src={productImage}
            alt={product.name}
            className={hovered ? 'hover-effect' : ''}
          />
          {product.soldOut && (
            <div className="sold-out-badge">Udsolgt</div>
          )}
        </div>
      </div>
      
      <h3 className="product-title">{product.name}</h3>
      <p className="product-price">{product.price} DKK</p>
      
      <button 
        className="add-to-cart-btn"
        onClick={() => showToast && showToast(product)}
      >
        Læg i kurv
      </button>

      <style jsx>{`
        .product-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px;
          cursor: pointer;
        }
        
        .product-image-container {
          width: 100%;
          margin-bottom: 10px;
          position: relative;
        }
        
        .image-wrapper {
          position: relative;
          background-color: #f8f8f8;
        }
        
        .sold-out-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background-color: #333;
          color: white;
          padding: 5px 15px;
          font-size: 14px;
          font-weight: 500;
        }
        
        .product-image-container img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        
        .hover-effect {
          transform: scale(1.03);
        }
        
        .product-title {
          margin: 8px 0;
          font-size: 16px;
          font-weight: 500;
          text-align: center;
        }
        
        .product-price {
          font-size: 16px;
          margin: 5px 0 15px 0;
        }
        
        .add-to-cart-btn {
          background-color: transparent;
          border: 1px solid #222;
          color: #222;
          padding: 8px 15px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .add-to-cart-btn:hover {
          background-color: #222;
          color: white;
        }
      `}</style>
    </div>
  );
}
