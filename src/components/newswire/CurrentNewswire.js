import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import styles from './current.module.css'
export default function CurrentNewswire({ current }) {
    const navigate = useNavigate()
    const { bannerImg, relasedDate, title, type, id } = current
    return <motion.section onClick={() => {
        window.scrollTo({ top: 0 })
        navigate(`${id}`)
    }} className={styles.currentNewswire} transition={{ delay: .5 }} initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
        <img id={styles.banner} src={bannerImg} alt='type' />
        <div className={styles.curr_details}>
            <header id={styles.details}>
                <span>{type}</span>
                <span className={styles.relaseDate}>{relasedDate}</span>
            </header>
            <h2 style={{ fontFamily: " 'Frenstyle', sans-serif", fontSize: "1.7rem" }}>{title}</h2>
        </div>
    </motion.section>
}