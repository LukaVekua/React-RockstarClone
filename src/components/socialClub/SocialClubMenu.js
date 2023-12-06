import './club-menu.scss'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import socialClubIcon from '../../assets/icons/social-club.png'
import jigsaw from '../../assets/icons/jigsaw.png'
const SocialClubMenu = () => {
    const navigate = useNavigate()
    return <motion.div className='club-menu' initial={{ opacity: 0, mrginLeft: -301 }} animate={{ opacity: 1, marginLeft: 0 }} exit={{ opacity: 0, marginLeft: -301 }}  >
        <section onClick={() => navigate('/socialclub')} className="menu-row">
            <span>Sign up</span>
            <img src={socialClubIcon} id='ico' alt='social-club-icon' />
        </section>
        <section onClick={() => navigate('/contribution')} className="menu-row">
            <span>Contribute</span>
            <img src={jigsaw} id='ico' alt='contribution' />
        </section>
    </motion.div>

}
export default SocialClubMenu