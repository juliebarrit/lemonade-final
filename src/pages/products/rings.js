import React from 'react';
import ProductList from '@/components/ProductList';
import axios from 'axios';
import Layout from '@/components/Layout';

export async function getServerSideProps() {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/products");
    const products = response.data
      .filter(product => product.type && product.type.toLowerCase() === 'fingerring')
      .map(product => ({
        productID: product.productID,
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image,
        type: product.type,
        color: product.color
      }));

    return { props: { products } };
  } catch (error) {
    return { props: { products: [] } };
  }
}

export default function ProductPage({ products }) {
  return (
    <Layout title="Ringe">
      <ProductList products={products} title="Ringe" />
    </Layout>
  );
}
