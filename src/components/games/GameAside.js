import './specificGameStyles/aside-border.scss'
import Functional from "./Functional"
export default function GameAside({ title, img }) {
    return <aside id='aside-border'>
        <h2>{title}</h2>
        <div>
            <Functional>Buy Now</Functional>
            <Functional>Official Site</Functional>
        </div>
        <img src={img} alt={title} />
    </aside>
}