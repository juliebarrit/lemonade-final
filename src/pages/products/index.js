import React from 'react';
import ProductList from '@/components/ProductList';
import axios from 'axios';
import Navbar from '@/components/Navbar';

export async function getServerSideProps() {
  try {
    // Fetch all products from Laravel backend
    const response = await axios.get("http://127.0.0.1:8000/api/products");
    
    // Use all products without filtering
    const products = response.data;

    return {
      props: {
        products,
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: {
        products: [],
        error: error.message || "Failed to fetch products"
      },
    };
  }
}

export default function ProductPage({ products }) {
  return (
    <>
      <Navbar />
      <ProductList products={products} title="Alle Smykker" />
    </>
  );
}
