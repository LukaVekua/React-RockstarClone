import './contribution.scss'
import { useMutation } from '@tanstack/react-query'
import { useReducer } from 'react'
import { addMyGame } from '../../async/actions'
import Nav from '../mainNavigation/Nav'
import Functional from '../games/Functional'
import { useNavigate } from 'react-router-dom'

const initialState = {
    developer: "",
    briefDescription: "",
    deepDescription: "",
    relasedDate: "",
    img: "",
    id: "",
    screens: {
        img1: '',
        img2: '',
        img3: '',
        img4: ''
    },
    platform: "",
    title: ""
}
function inputsReducer(state, action) {
    if (action.type === 'username') {
        return {
            ...state,
            developer: action.payload,
        }
    } else if (action.type === 'briefDescription') {
        return {
            ...state,
            briefDescription: action.payload
        }
    } else if (action.type === 'deepDescription') {
        return {
            ...state,
            deepDescription: action.payload
        }
    } else if (action.type === 'relasedDate') {
        return {
            ...state,
            relasedDate: action.payload
        }
    } else if (action.type === 'bannerImg') {
        return {
            ...state,
            img: action.payload
        }
    } else if (action.type === '1screen') {
        return {
            ...state,
            screens: {
                ...state.screens,
                img1: action.payload
            }
        }
    }
    else if (action.type === '2screen') {
        return {
            ...state,
            screens: {
                ...state.screens,
                img2: action.payload
            }
        }
    }
    else if (action.type === '3screen') {
        return {
            ...state,
            screens: {
                ...state.screens,
                img3: action.payload
            }
        }
    }
    else if (action.type === '4screen') {
        return {
            ...state,
            screens: {
                ...state.screens,
                img4: action.payload
            }
        }
    }
    else if (action.type === 'platforms') {
        const validated = action.payload.replaceAll(' ', ',')
        return {
            ...state,
            platform: `[${validated}]`
        }
    } else if (action.type === 'title') {
        return {
            ...state,
            title: action.payload,
            id: action.payload
        }
    } else if (action === 'clear') {
        return initialState
    }
}


export default function Contribution() {
    const navigate = useNavigate()
    const [inputs, dispatch] = useReducer(inputsReducer, initialState)
    const { mutate, isLoading, isSuccess } = useMutation({
        mutationKey: ['add-game'],
        mutationFn: addMyGame,
        onSuccess: () => {
            dispatch('clear')
            navigate('/games')
        }
    })
    return <>
        <Nav />
        <section id='create-game-container'>
            <h1>Add Games To Global Game Library</h1>
            <form>
                <div className='input-container'>
                    <div>
                        <label>Your Name</label>
                        <input type='text' onChange={(e) => dispatch({ type: 'username', payload: e.target.value })} />
                    </div>
                    <div>
                        <label>Brief Description</label>
                        <textarea onChange={(e) => dispatch({ type: 'briefDescription', payload: e.target.value })} />
                    </div>
                    <div>
                        <label>Banner IMG URL</label>
                        <input type='text' onChange={(e) => dispatch({ type: 'bannerImg', payload: e.target.value })} />
                    </div>
                    <div>
                        <label>Relased Date</label>
                        <input type='text' onChange={(e) => dispatch({ type: 'relasedDate', payload: e.target.value })} />
                    </div>
                    <div>
                        <label>Detalized Description</label>
                        <textarea onChange={(e) => dispatch({ type: 'deepDescription', payload: e.target.value })} />
                    </div>

                    <div>
                        <label>Required 4 Screens URL From Game</label>
                        <input type='text' onChange={(e) => dispatch({ type: '1screen', payload: e.target.value })} />
                        <input type='text' onChange={(e) => dispatch({ type: '2screen', payload: e.target.value })} />
                        <input type='text' onChange={(e) => dispatch({ type: '3screen', payload: e.target.value })} />
                        <input type='text' onChange={(e) => dispatch({ type: '4screen', payload: e.target.value })} />
                    </div>
                    <div>
                        <label>Platforms</label>
                        <input type='text' onChange={(e) => dispatch({ type: 'platforms', payload: e.target.value })} />
                    </div>
                    <div>
                        <label>Game Name</label>
                        <input type='text' onChange={(e) => dispatch({ type: 'title', payload: e.target.value })} />
                    </div>
                </div>
            </form>
            {!isLoading && <Functional action={() => mutate(inputs)} customStyle={{ alignSelf: 'center' }}>Add Game</Functional>}
            {isLoading && <p>Submitting...</p>}
        </section>
    </>
}



