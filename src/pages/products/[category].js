import ProductList from '@/components/ProductList'; // Ensure this is a default import
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function getServerSideProps({ params }) {
  const { category } = params;
  const productsRef = collection(db, 'products');
  const q = query(productsRef, where('category', '==', category));
  const snapshot = await getDocs(q);
  const products = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    props: {
      products,
      category,
    },
  };
}

export default function ProductPage({ products, category }) {
  const title = category.charAt(0).toUpperCase() + category.slice(1);
  return <ProductList products={products} title={title} />;
}
