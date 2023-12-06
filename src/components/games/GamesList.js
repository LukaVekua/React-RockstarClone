import { useQuery } from "@tanstack/react-query";
import { fetchGames } from "../../async/actions";
import { motion, useTransform, useScroll } from 'framer-motion'
import GameItem from "./GameItem";
import { useNavigate } from "react-router-dom";

export default function GamesList({ limited }) {
    const { scrollYProgress } = useScroll()
    const { data: games, isLoading } = useQuery({
        queryKey: ['games', { limit: limited ? 4 : false }],
        queryFn: ({ queryKey }) => fetchGames(queryKey[1].limit)
    })
    const navigate = useNavigate()
    console.log(games)
    const gamesSectionOpacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 1])
    const gamesSectionY = useTransform(scrollYProgress, [0.8, 0.9], [70, 0])
    return <motion.section style={{ opacity: gamesSectionOpacity, y: gamesSectionY, width: limited ? '90%' : '100%', margin: "2rem auto", display: "flex", flexDirection: limited ? 'column' : 'row', flexWrap: !limited && 'wrap', alignItems: 'flex-start' }}>
        {limited && <h2 style={{ fontSize: "2.2rem", fontFamily: 'Rockstar' }}>Featured Games</h2>}
        <div style={{ width: '100%', display: "flex", justifyContent: "space-evenly" }}> {!isLoading && games.map(game => {
            const { img, id, type } = game
            return <GameItem id={id} type={type} img={img} limited={limited} />
        })}</div>
        {limited && <motion.span
            onClick={() => {
                window.scrollTo({ top: 0 })
                navigate('/games')
            }}
            whileHover={{ backgroundColor: '#fcaf17', color: "black" }}
            style={{
                alignSelf: "center",
                marginTop: "2rem",
                fontSize: "1.5rem",
                color: "white",
                textDecoration: "none",
                padding: "5px 10px",
                borderRadius: "5px",
                borderBottom: "5px solid #fcaf17"
            }}>View More</motion.span>}
    </motion.section >
}