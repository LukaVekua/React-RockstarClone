import styles from '../mainNavigation/mainNav.module.css'
import { useNavigate } from 'react-router-dom'
import rockstarLogo from '../../assets/icons/rockstar-logo.png'
import arrow from '../../assets/icons/down-arrow.png'
import { motion, useScroll, useTransform, AnimatePresence, useAnimate } from 'framer-motion'
import { useContext, useState } from 'react'
import toolsContext from '../../store/context/toolsContext'
import SocialClubMenu from '../socialClub/SocialClubMenu'

export default function Nav() {
    const { expanded, expander, animate, scope, localScope, localAnimateFn } = useContext(toolsContext)
    const [clubMenuScope, clubAnimate] = useAnimate()
    const [clubExpanded, setClubExpanded] = useState(false)
    const navigate = useNavigate()
    const logoNavigate = () => navigate('/')
    const expandHandler = () => {
        expander(prev => !prev)
        if (expanded) {
            localAnimateFn('#first', { opacity: [0, 1], y: 0 }, { type: 'spring' })
            localAnimateFn('#last', { opacity: [0, 1], y: 0 }, { type: 'spring' })
            animate(scope.current, { marginLeft: '-21rem' }, { duration: .5, type: "spring" })
        } else if (!expanded) {
            localAnimateFn('#first', { opacity: [1, 0], y: [0, 10] }, { type: 'spring' })
            localAnimateFn('#last', { opacity: [1, 0], y: [0, -10] }, { type: 'spring' })
            animate(scope.current, { marginLeft: 0 }, { duration: .5, type: "spring" })
        }
    }
    const { scrollY } = useScroll()
    const expandSocialClubMenu = () => {
        setClubExpanded(x => !x)
        if (clubExpanded) {
            clubAnimate('#arrow', { rotate: 360 }, { type: "keyframes" })
        } else {
            clubAnimate('#arrow', { rotate: 180 }, { type: "keyframes" })
        }
    }
    const scrollingTop = useTransform(scrollY, [0, 300], [0, -100])
    return <AnimatePresence>
        <motion.nav ref={clubMenuScope} style={{ top: scrollingTop, position: 'sticky' }} transition={{ type: 'spring' }} initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} className={styles.nav} exit={{ opacity: 0, y: 50 }}>
            <div ref={localScope} onClick={expandHandler} id={styles.menuExpander}>
                <div id='first' />
                <div id='middle' />
                <div id='last' />
            </div>
            <span onClick={logoNavigate}><img id={styles.logo} className={styles.img} src={rockstarLogo} alt='Rlogo' /></span>
            <span onClick={() => expandSocialClubMenu()}>
                <motion.img id='arrow' className={styles.img} src={arrow} style={{ width: '27px', height: '27px', marginRight: '.7rem' }} alt='Slogo' />
            </span>
        </motion.nav>
        {clubExpanded && <SocialClubMenu />}
    </AnimatePresence >
}
