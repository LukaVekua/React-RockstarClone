import styles from './bannerSlider.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css'
import { useQuery } from '@tanstack/react-query'
import { fetchNewswires } from '../../async/actions';
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';
import SlideActions from './SlideActions';

export default function BannerSlider() {
    const navigate = useNavigate()
    const { data, isLoading } = useQuery({
        queryKey: ['rockstar-updates', { limit: 6 }],
        queryFn: ({ queryKey }) => fetchNewswires(queryKey[1].limit)
    })
    setInterval(() => {

    }, 3000)
    return <motion.div
        key='wrapper'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ delay: .5, type: "just" }}
        layout> <Swiper
            className={styles.swiper}
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            slidesPerView={1}
            spaceBetween={50}
            navigation={true}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
        >
            {!isLoading && data.map(update => <SwiperSlide className={styles.slide} key={update.title}>
                <div >
                    <img src={update.bannerImg} style={{ cursor: "pointer" }} onClick={() => {
                        navigate(`/newswire/${update.id}`)
                    }} />
                    <div id={styles.details}>
                        <span >{update.type}</span>
                        <h2>{update.title}</h2>
                        <motion.button whileTap={{ scale: [1.1, .9, 1] }} whileHover={{ backgroundColor: "#fcaf17", color: 'black' }} transition={{ type: 'spring' }} className={styles.watch}>WATCH NOW</motion.button>
                        <SlideActions styles={styles} />
                    </div>
                </div>
            </SwiperSlide>)
            }

        </Swiper >
    </motion.div >
}