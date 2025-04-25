import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { Container, Row, Col } from 'react-bootstrap';

export default function ProductList({ products, title }) {
  const [sortBy, setSortBy] = useState("bestsellers");
  const [filterOpen, setFilterOpen] = useState(false);
  
  const showAddToCartToast = (product) => {
    // Simple alert instead of toast until we install react-toastify
    alert(`${product.name} added to cart!`);
  };
  
  return (
    <Container className="my-5">
      <h1 className="mb-5" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{title}</h1>
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="filter-section">
          <span>Filter: </span>
          <button 
            className="filter-button"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            Tilgængelighed {filterOpen ? '▲' : '▼'}
          </button>
          
          {filterOpen && (
            <div className="filter-dropdown">
              <div className="filter-option">
                <input type="checkbox" id="in-stock" />
                <label htmlFor="in-stock">In Stock</label>
              </div>
              <div className="filter-option">
                <input type="checkbox" id="out-of-stock" />
                <label htmlFor="out-of-stock">Out of Stock</label>
              </div>
            </div>
          )}
        </div>
        
        <div className="sort-section">
          <span>Sortér efter: </span>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="bestsellers">Bestsellers</option>
            <option value="price-low">Price (Low to High)</option>
            <option value="price-high">Price (High to Low)</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>
      
      <div className="products-count mb-3">
        {products.length} produkter
      </div>
      
      <Row>
        {products.map((product) => (
          <Col md={4} sm={6} key={product.productID || product.id} className="mb-4">
            <ProductCard product={product} showToast={showAddToCartToast} />
          </Col>
        ))}
      </Row>
      
      <style jsx>{`
        .filter-button {
          background: none;
          border: none;
          font-weight: 500;
          cursor: pointer;
          margin-left: 5px;
        }
        
        .filter-dropdown {
          position: absolute;
          background: white;
          border: 1px solid #ddd;
          padding: 10px;
          margin-top: 5px;
          z-index: 100;
        }
        
        .filter-option {
          margin: 8px 0;
        }
        
        .sort-select {
          border: none;
          background: transparent;
          font-weight: 500;
          cursor: pointer;
          padding-right: 15px;
        }
        
        .products-count {
          font-size: 0.9rem;
          color: #666;
        }
      `}</style>
    </Container>
  );
}
