import Header from './components/header/Header'
import Reel from './components/reel/Reel'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
        <Header/>
        <Reel/>
    </main>
  )
}