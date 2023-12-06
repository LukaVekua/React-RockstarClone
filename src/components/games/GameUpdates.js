import './specificGameStyles/updates.scss'
import { useScroll, useTransform, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function GameUpdates({ newswires }) {
    const { scrollY } = useScroll()
    const navigate = useNavigate()
    const yPosition = useTransform(scrollY, [0, 200], [100, 0])
    const opacitiy = useTransform(scrollY, [0, 200], [0, 1])
    return <motion.div style={{ y: yPosition, opacity: opacitiy }} layout initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className='game-updates'>
        <h2 id='section-header'>Latest News</h2>
        <div className='inner-wrapper'>
            {newswires.map(update => {
                const { bannerImg, id, type, title, relasedDate } = update
                return <div onClick={() => {
                    window.scrollTo({ top: 0 })
                    navigate(`/newswire/${id}`)
                }} id='wrapper' key={id}>
                    <img src={bannerImg} />
                    <div id='update-details'>
                        <header>
                            <span>{type}</span>
                            <span>{relasedDate}</span>
                        </header>
                        <h2>{title}</h2>
                    </div>
                </div>
            })}
        </div>
    </motion.div>

}