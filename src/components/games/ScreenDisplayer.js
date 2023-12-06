import './specificGameStyles/screens.scss'
import { motion } from 'framer-motion'

export default function ScreenDisplayer({ screens }) {
    console.log(screens)
    const urls = Object.values(screens)
    console.log(urls)
    return <motion.section className='screens'>
        <h2>Screens</h2>
        <div className='imgs'>
            {urls.map(img => <img key={img} src={img} alt={img} />)}
        </div>
    </motion.section>
}