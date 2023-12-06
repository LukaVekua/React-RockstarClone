import Nav from "../components/mainNavigation/Nav"
import BannerSlider from "../components/bannerSlider/BannerSlider"
import NewswireList from "../components/newswire/NewswireList"
import GamesList from "../components/games/GamesList"

import { AnimatePresence } from "framer-motion"

export default function Home() {

    return <AnimatePresence>
        <Nav />
        <BannerSlider />
        <NewswireList limited={true} />
        <GamesList limited={true} />
    </AnimatePresence>
}