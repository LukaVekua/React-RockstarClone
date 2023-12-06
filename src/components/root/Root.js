import { Outlet } from "react-router-dom"
import Menu from "../menu/Menu"
export default function Root() {
    return <>
        <Menu />
        <Outlet />
    </>
}