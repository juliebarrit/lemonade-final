import React from 'react'; // Ensure React is imported
import ProductList from '@/components/ProductList'; // Ensure this is a default import
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function getServerSideProps() {
  const productsRef = collection(db, 'products');
  const snapshot = await getDocs(productsRef);
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
  return <ProductList products={products} title="Earrings" />;
}
