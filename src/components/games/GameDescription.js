import './specificGameStyles/description.scss'
import { useState } from "react"
import Functional from "./Functional"
import { motion } from 'framer-motion'

export default function GameDescription({ brief, deep }) {

    const [isDetailed, setDetail] = useState(false)
    function toggleHandler() {
        setDetail(prev => !prev)
    }

    return <motion.section layout className='game-det-box'>
        < h3 style={{ color: "white" }
        }> Game Description</h3 >
        <p>{brief}</p>
        {isDetailed && <motion.p key='descr' transition={{ type: "just" }} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }}>{deep}</motion.p>}
        <Functional action={toggleHandler}>{!isDetailed ? 'Read More' : 'Read Less'}</Functional>
    </motion.section >


}