import styles from './listItem.module.css'
export default function NewswireListItem({ item }) {
    const { bannerImg, relasedDate, title, type } = item
    return <>
        <div className={styles.img} style={{ backgroundImage: `url(${bannerImg})` }} />
        <div className={styles.details}>
            <header className={styles.det}>
                <span>{type}</span>
                <span>{relasedDate}</span>
            </header>
            <h2>{title}</h2>
        </div>
    </>
}