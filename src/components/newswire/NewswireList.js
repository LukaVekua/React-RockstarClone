import styles from './list.module.css'
import { useQuery } from "@tanstack/react-query";
import { fetchNewswires } from '../../async/actions'
import { useTransform, motion, stagger, useScroll } from 'framer-motion'
import NewswireListItem from "./NewswireListItem";
import { useNavigate } from 'react-router-dom';

export default function NewswireList({ limited }) {
    const navigate = useNavigate()
    const { scrollY } = useScroll()

    const { data: list, isLoading } = useQuery({
        queryKey: ['newswire', { limit: limited ? 6 : false }],
        queryFn: ({ queryKey }) => fetchNewswires(queryKey[1].limit)
    })
    const sectionOpacity = useTransform(scrollY, [100, 400], [0, 1])
    const itemOpacity = useTransform(scrollY, [100, 600], [0, 1])
    const sectionY = useTransform(scrollY, [100, 500], [50, 0])
    return <>
        <motion.section style={{ y: sectionY, opacity: sectionOpacity }} className={styles.listContainer}>
            {limited && <div style={{ width: '100%' }}>
                <h2 style={{ fontSize: "2.2rem", fontFamily: 'Rockstar' }}>Newswire</h2>
            </div>}
            {!isLoading && list.map(item => <motion.div onClick={() => {
                window.scrollTo({ top: 0 })
                navigate(`/newswire/${item.id}`)
            }
            } style={{ opacity: itemOpacity }} className={styles.listItem}
                key={`${limited !== false && `limited${item.id}`}`} >
                < NewswireListItem styles={styles} item={item} />
            </motion.div>)}
            {limited && <div style={{ width: '100%', display: 'flex', justifyContent: "center", alignItems: "center" }}>
                <motion.span onClick={() => {
                    window.scrollTo({ top: 0 })
                    navigate('/newswire')
                }} whileHover={{ backgroundColor: '#fcaf17', color: "black" }} transition={{ type: "spring" }} className={styles.link}>View More</motion.span>
            </div>}
        </motion.section >
    </>

}