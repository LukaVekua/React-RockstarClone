import { QueryClient } from "@tanstack/react-query"
import axios from "axios"
const client = new QueryClient()
export default client

function dataTransformer(obj) {
    for (let key in obj) {
        return obj[key]
    }
}


export async function fetchNewswires(limit = false) {
    const response = await fetch('https://games-1f2fb-default-rtdb.firebaseio.com/newswire.json')
    const data = await response.json()
    let transformed = dataTransformer(data)
    if (limit !== false) return transformed.filter((el, index) => index < limit)
    return transformed
}

export async function fetchSpecificNewswire(id) {
    const response = await fetch('https://games-1f2fb-default-rtdb.firebaseio.com/newswire.json')
    const data = await response.json()
    const valid = dataTransformer(data)
    const [requested] = valid.filter(newswire => newswire.id === id)
    return requested
}

export async function fetchSpecificGameUpdates(game) {
    const response = axios({
        method: "GET",
        url: "https://games-1f2fb-default-rtdb.firebaseio.com/newswire.json"
    })
    const { data } = await response
    return dataTransformer(data).filter(update => update.game === game)

}

export async function fetchGames(limit) {
    const response = await fetch('https://games-1f2fb-default-rtdb.firebaseio.com/games.json')
    const data = await response.json()
    let fetchedArr = Object.values(data)
    let fetchedGames = fetchedArr[0]
    for (let i = 1; i < fetchedArr.length; i++) {
        fetchedGames.push(fetchedArr[i])
    }

    if (limit) return dataTransformer(data).filter((game, index) => index < limit)
    return dataTransformer(data)

}

export async function fetchRelevantUpdates(currentID, type) {
    const response = await fetch('https://games-1f2fb-default-rtdb.firebaseio.com/newswire.json')
    const data = await response.json()
    const valid = dataTransformer(data)
    const requested = valid.filter(newswire => {
        if (newswire.type === type && newswire.id !== currentID) return newswire
    }
    ).filter((x, index) => index < 3)
    return requested
}

export async function fetchGame(id) {
    const response = axios.get('https://games-1f2fb-default-rtdb.firebaseio.com/games.json')
    const fetchedData = await response
    let fetchedArr = Object.values(fetchedData.data)

    let fetchedGames = fetchedArr[0]

    for (let i = 1; i < fetchedArr.length; i++) {
        fetchedGames.push(fetchedArr[i])
    }

    return fetchedGames.filter(game => game.id === id)[0]

}


export async function addMyGame(dataObj) {
    axios({
        method: 'POST',
        url: 'https://games-1f2fb-default-rtdb.firebaseio.com/games.json',
        data: JSON.stringify(dataObj)
    })
}