import ProductsList from '@/components/Products/ProductsList';
import RestaurantsList from '@/components/Restaurants/RestaurantsList';
import { getData } from '@/utils/fetch';

export default async function Home() {
  const restaurantsResult = await getData('/api/restaurants');
  const productResult = await getData('/api/products');
  return (
    <div style={{ display: 'flex', gap: '1rem'}}>
      <RestaurantsList restaurants={restaurantsResult.restaurants} />
      <ProductsList products={productResult.products} />
    </div>
  );
}
