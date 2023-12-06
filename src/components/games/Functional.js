import './specificGameStyles/fn-styles.scss'
import { motion } from 'framer-motion'
export default function Functional({ action, children, customStyle }) {
    return <motion.span id='fn-btn' layout whileHover={{ backgroundColor: '#fcaf17', color: "black" }}
        onClick={action}
        style={customStyle !== undefined && customStyle}
    > {children}</motion.span >
}