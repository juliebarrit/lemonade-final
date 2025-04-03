import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import HeroSection from '@/components/HeroSection';
import TrendingProducts from '@/components/TrendingProducts';

export async function getServerSideProps() {
  const productsRef = collection(db, 'products');
  const snapshot = await getDocs(productsRef);
  const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  const trendingProducts = products.slice(0, 4);

  return {
    props: { trendingProducts },
  };
}

export default function HomePage({ trendingProducts }) {
  return (
    <>
      <HeroSection />
      <TrendingProducts products={trendingProducts} />
    </>
  );
}
