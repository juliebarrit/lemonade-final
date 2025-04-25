import React from 'react';
import ProductList from '@/components/ProductList';
import axios from 'axios';

export async function getServerSideProps() {
  try {
    // Fetch all products from Laravel backend
    const response = await axios.get("http://127.0.0.1:8000/api/products");
    
    // Filter products where type is 'øreringe'
    const products = response.data.filter(product => 
      product.type && product.type.toLowerCase() === 'øreringe'
    );

    return {
      props: {
        products,
      },
    };
  } catch (error) {
    console.error("Error fetching earring products:", error);
    return {
      props: {
        products: [],
        error: error.message || "Failed to fetch products"
      },
    };
  }
}

export default function ProductPage({ products }) {
  return <ProductList products={products} title="Earrings" />;
}
