import ProductsList from '@/components/Products/ProductsList';
import RestrauntsList from '@/components/Restraunts/RestaurantsList';
import { getData } from '@/utils/fetch';
export default async function Home() {

  const restaurantsResult = await getData('/api/restaurants');
  const productResult = await getData('/api/products');
  console.log(productResult)
  return (
    <div style={{ display: 'flex', gap: '1rem'}}>
      <RestrauntsList restaurants={restaurantsResult.restaurants} />
      <ProductsList products={productResult.products} />
    </div>
  );
}
