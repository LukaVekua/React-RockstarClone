import './specificGameStyles/specifications.scss'
export default function GameDetails({ details }) {
    const { developer, platform, relasedDate } = details
    console.log(platform)
    const platformCorrected = platform.slice(1, platform.length - 1)
    return <div className='specifications-container'>
        <h2>Specifications</h2>
        <div className="row">
            <span>Developer</span>
            <span>{developer}</span>
        </div>
        <div className="row">
            <span>Platform</span>
            <span>{platformCorrected}</span>
        </div>
        <div className="row">
            <span>Relased Date</span>
            <span>{relasedDate}</span>
        </div>
    </div>
}