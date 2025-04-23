import React, { useState } from 'react';

export default function ProductCard({ product, showToast }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer', textAlign: 'center' }}
    >
      <div>
        <img
          src={hovered && product.images.length > 1 ? product.images[1] : product.images[0]}
          alt={product.name}
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
      <h2>{product.name}</h2>
      <p>{product.price}</p>
      <button onClick={showToast}>Add to Cart</button>
    </div>
  );
}
