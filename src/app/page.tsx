import styles from './page.module.css'
import ProductsList from '@/components/Products/ProductsList'
export default function Home() {
  return (
    <main className={styles.main}>
      <ProductsList />
    </main>
  )
}
