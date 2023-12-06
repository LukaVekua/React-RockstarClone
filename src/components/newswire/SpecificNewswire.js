import { useQuery } from "@tanstack/react-query"
import { fetchSpecificNewswire } from "../../async/actions"
import { useParams } from "react-router-dom"
import { motion, useTransform, useScroll } from 'framer-motion'
import styles from './specific.module.css'
import RelevantUpdates from "./RelevantsUpdates"
import Nav from "../mainNavigation/Nav"
export default function SpecificNewswire() {
    const { scrollY } = useScroll()
    const { newswireId: id } = useParams()
    const { data, isLoading } = useQuery({
        queryKey: ['newswire', { id }],
        queryFn: ({ queryKey }) => fetchSpecificNewswire(queryKey[1].id)

    })
    const suggestBoxOpacity = useTransform(scrollY, [0, 1900], [0, 1])
    const { bannerImg, description, dominantColor, id: newswireID, relasedDate, subTitle, title, type, suggestions } = data !== undefined && data
    return <>
        <Nav />
        <motion.main initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .5, type: "just" }} className={styles.mainContainer}>
            {!isLoading && <>
                <motion.img initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .5, type: "just" }} className={styles.banner} src={bannerImg} alt={title} />
                <motion.header initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .5, type: "just" }} className={styles.headerCont}>
                    <h2 style={{ color: dominantColor, fontFamily: "'Rockstar', sans-serif" }}>{title}</h2>
                    <h3>{subTitle}</h3>
                    <span className={styles.relased}>{relasedDate}</span>
                    <p className={styles.description}>{description}</p>
                </motion.header>
                {
                    suggestions.map(suggestion => <motion.div style={{ opacity: suggestBoxOpacity }} className={styles.suggestion} key={suggestion.title}>
                        <img className={styles.banner} src={suggestion.img} />
                        <h3>{suggestion.title}</h3>
                        <p>{suggestion.text}</p>
                    </motion.div>)
                }
            </>}
            <RelevantUpdates currentID={newswireID} type={type} />
        </motion.main>
    </>
}