import { useNavigate } from "react-router-dom"
export default function GameItem({ id, type, img, limited }) {
    const navigate = useNavigate()
    const navigateHandler = (id, type = null) => {
        window.scrollTo({ top: 0 })
        if (type !== null) {
            navigate(`/${type}`)
        } else {
            navigate(`/games/${id}`)
        }
    }

    return <img
        onClick={() => navigateHandler(id, type)}
        src={img}
        key={id}
        alt="id"
        style={{
            cursor: "pointer",
            marginBottom: !limited && "1rem",
            width: limited ? "23%" : "30%",
            height: limited ? `450px` : '550px',
            borderRadius: "10px"
        }} />
}