import { useQuery } from '@tanstack/react-query'
import { motion, useScroll, useTransform } from 'framer-motion'
import styles from './relevant.module.css'
import { fetchRelevantUpdates } from "../../async/actions"
import NewswireListItem from './NewswireListItem'
import { useNavigate } from 'react-router-dom'
export default function RelevantUpdates({ currentID, type }) {
    const { scrollYProgress } = useScroll()
    const { data: relevants, isLoading } = useQuery({
        queryKey: ['relevant', [currentID, type]],
        queryFn: ({ queryKey }) => fetchRelevantUpdates(...queryKey[1])
    })
    const containerOpacity = useTransform(scrollYProgress, [0.9, 1], [0, 1])
    const navigate = useNavigate()
    return <motion.div style={{ opacity: containerOpacity }} className={styles.outer}>
        {!isLoading && relevants.map(relevant => <div onClick={() => {
            window.scrollTo({ top: 0 })
            navigate(`/newswire/${relevant.id}`)
        }} className={styles.listItem}>
            <NewswireListItem key={relevant.id} item={relevant} />
        </div>)}
    </motion.div>


}