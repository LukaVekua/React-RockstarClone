import { useSwiper } from "swiper/react"
import { motion } from "framer-motion"
import right from '../../assets/icons/right.png'
import left from '../../assets/icons/left.png'
export default function SlideActions({ styles }) {
    const swiper = useSwiper()
    return <div className={styles.slideActions}>
        <motion.button whileTap={{ y: [0, 20, 0] }} onClick={() => swiper.slidePrev()} className={styles.actions}><img src={left} alt="left" /></motion.button>
        <motion.button onClick={() => swiper.slideNext()} className={styles.actions}><img src={right} alt="right" /></motion.button>

    </div>
}