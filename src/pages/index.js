import axios from 'axios';
import HeroSection from '@/components/HeroSection';
import TrendingProducts from '@/components/TrendingProducts';
import Navbar from '@/components/Navbar';

export async function getServerSideProps() {
  try {
    // Fetch products from Laravel backend
    const response = await axios.get("http://127.0.0.1:8000/api/products");
    
    // Get the first 4 products as trending products
    const trendingProducts = response.data.slice(0, 4);

    return {
      props: { trendingProducts },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: { 
        trendingProducts: [],
        error: error.message || "Failed to fetch products"
      },
    };
  }
}

export default function HomePage({ trendingProducts }) {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TrendingProducts products={trendingProducts} />
    </>
  );
}
