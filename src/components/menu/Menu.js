import styles from './menu.module.css'
import { AnimatePresence, motion, stagger, useAnimate } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import toolsContext from '../../store/context/toolsContext'

export default function Menu() {

    const { expanded, expander, scope, animate, localAnimateFn } = useContext(toolsContext)

    const navigate = useNavigate()
    function switchTo(url) {
        expander(false)
        animate(scope.current, { marginLeft: '-21rem' }, { duration: .5, type: "spring" })
        localAnimateFn('#first', { opacity: [0, 1], y: 0 }, { type: 'spring' })
        localAnimateFn('#last', { opacity: [0, 1], y: 0 }, { type: 'spring' })
        navigate(url)
    }
    function expandHandler() {
        expander(false)
        animate(scope.current, { marginLeft: '-21rem' }, { duration: .5, type: "spring" })
        localAnimateFn('#first', { opacity: [0, 1], y: 0 }, { type: 'spring' })
        localAnimateFn('#last', { opacity: [0, 1], y: 0 }, { type: 'spring' })
    }


    return <AnimatePresence>
        {expanded && <motion.div onClick={expandHandler} key='overlay' initial={{ opacity: 0 }} animate={{ opacity: 1, }} exit={{ opacity: 0 }} id={styles.overlay}></motion.div>}
        <motion.div key="menu" ref={scope} style={{ marginLeft: expanded ? '0rem' : "-21rem" }} className={styles.menu}>
            <motion.h2
                className='child'
                onClick={switchTo.bind(null, '/newswire')}
                whileHover={{ color: "#fcaf17" }}>Newswire</motion.h2>
            <motion.h2 className='child' onClick={switchTo.bind(null, '/games')} whileHover={{ color: "#fcaf17" }}>Games</motion.h2>
            <motion.h2 className='child' onClick={switchTo.bind(null, '/socialclub')} whileHover={{ color: "#fcaf17" }}>Social Club</motion.h2>

        </motion.div >
    </AnimatePresence >

}