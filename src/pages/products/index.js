import ProductList from '@/components/ProductList';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function getServerSideProps(context) {
  const { category } = context.query;
  const productsRef = collection(db, 'products');
  const q = category ? query(productsRef, where('category', '==', category)) : productsRef;
  const snapshot = await getDocs(q);
  const products = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    props: {
      products,
      category: category || 'All Jewelry',
    },
  };
}

export default function ProductPage({ products, category }) {
  return <ProductList products={products} title={category} />;
}
