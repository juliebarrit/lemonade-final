import React from 'react';
import ProductList from '@/components/ProductList';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function getServerSideProps() {
  const productsRef = collection(db, 'products');
  const q = query(productsRef, where('category', '==', 'bracelets'));
  const snapshot = await getDocs(q);
  const products = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    props: {
      products,
    },
  };
}

export default function ProductPage({ products }) {
  return <ProductList products={products} title="Bracelets" />;
}
