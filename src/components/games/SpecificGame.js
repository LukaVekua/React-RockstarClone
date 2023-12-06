import './specificGameStyles/specific-body.scss'
import { useParams } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import { motion, AnimatePresence, la } from 'framer-motion'
import { fetchGame, fetchSpecificGameUpdates } from "../../async/actions";
import Nav from '../mainNavigation/Nav';
import GameAside from "./GameAside";
import GameDescription from './GameDescription';
import GameUpdates from './GameUpdates';
import ScreenDisplayer from './ScreenDisplayer';
import GameDetails from './GameDetails';

export default function SpecificGame() {
    const { gameId } = useParams()
    const [game, gameUpdates] = useQueries({
        queries: [
            { queryKey: ['game', { id: gameId }], queryFn: () => fetchGame(gameId) },
            { queryKey: ['newswire', { game: gameId }], queryFn: () => fetchSpecificGameUpdates(gameId) }
        ]
    })
    const { data: currGame, isLoading: gameIsLoading } = game
    const { data: gameNewswires, isLoading: updatesAreLoading } = gameUpdates
    console.log(currGame)
    const {
        briefDescription,
        deepDescription,
        developer,
        id,
        img,
        platform,
        relasedDate,
        screens,
        title
    } = currGame !== undefined && currGame

    return <AnimatePresence>
        <Nav />
        <GameAside img={img} title={title} />
        <motion.main key='main' initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -100 }} id='main-content'>
            <section id='content'>
                {!gameIsLoading && <GameDescription brief={briefDescription} deep={deepDescription} />}
                {!updatesAreLoading && <GameUpdates newswires={gameNewswires} />}
                {!gameIsLoading && <ScreenDisplayer screens={screens} />}
                {!gameIsLoading && <GameDetails details={{ developer, platform, relasedDate }} />}
            </section>
        </motion.main >
    </AnimatePresence>

}