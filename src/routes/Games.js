import Nav from "../components/mainNavigation/Nav"
import { useQuery } from "@tanstack/react-query"
import { fetchGames } from "../async/actions"
import { motion, useTransform, useScroll } from 'framer-motion'
import GameItem from "../components/games/GameItem"

export default function Games() {
    const { scrollY } = useScroll()
    const { data, isLoading } = useQuery({
        queryKey: ['games', { limit: false }],
        queryFn: ({ queryKey }) => fetchGames(queryKey[1].limit)
    })

    return <>
        <Nav />
        <motion.main
            style={{
                width: "90%",
                margin: "3rem auto",
                marginTop: '6rem',
                display: "flex",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
                gap: "2.5rem"
            }}
        >
            {!isLoading && data.map(game => {
                const { id, img, type } = game
                return < GameItem id={id} img={img} type={type} limited={false} />
            })}
        </motion.main>
    </>

}