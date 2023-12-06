import clubImg from '../../assets/imgs/socialclub.png'
import rockstar from '../../assets/icons/rockstar-logo.png'
import './club.scss'
import { useEffect, useReducer, useState } from 'react'
import { motion, useAnimate, AnimatePresence } from 'framer-motion'
import useFormValidate from '../../hooks/useFormValidate'
import UnfinishedAlert from '../UI fedback/UnfinishedAlert'
let done = {
    active: false,
    done: true
}
let isNext = {
    active: true,
    done: false
}
let initialStepsState = { first: { active: true, done: false }, second: { active: false, done: false }, third: { active: false, done: false } }
function stepsReducer(state, action) {
    const { first, second, third } = state
    if (!first.done) {
        return {
            ...state,
            first: done,
            second: isNext
        }
    }
    if (second.active) {
        return {
            ...state,
            second: done,
            third: isNext
        }
    }
    if (third.active) {
        return { ...state, third: done }
    }
    return state
}


// add validations to all forms via custom hooks
// add toggle to social club icon on main nav


export default function SocialClub() {
    const [steps, dispatchSteps] = useReducer(stepsReducer, initialStepsState)
    const { methods, validations, triggeres } = useFormValidate()
    const { usernameIsValid, emailIsValid } = validations
    const { usernameIsTouched, emailIsTouched } = triggeres
    console.log('validations', validations)
    console.log('touches', triggeres)
    const { first, second, third } = steps
    const [scope, animate] = useAnimate()
    function forwardHandler() {
        dispatchSteps()
    }
    useEffect(() => {
        if (!steps.third.done) {
            animate('.active-step', { scale: [1, 1.3, 1,], border: ['none', "3px solid #fcaf17"] })

        } else {
            animate('#first', { opacity: [1, 0], x: [0, 135], })
            animate('#mid', { opacity: [1, 0], })
            animate('#last', { opacity: [1, 0], x: [0, -135], })
            animate(".line", { opacity: [1, 0], width: [153, 0] })
        }
    }, [steps])
    return <AnimatePresence>
        <motion.section ref={scope} initial={{ opacity: 0, }} animate={{ opacity: 1, }} transition={{ delay: .3, type: "just" }} id='club-auth'>
            <img src={clubImg} />
            <div id='register-container'>
                <header>
                    <motion.div id='first' className={`step ${first.active && 'active-step'} ${first.done && 'done'}`}></motion.div>
                    <motion.div style={{ backgroundColor: first.done && '#fcaf17', transition: 'all .3s linear' }} className={`line `}></motion.div>
                    <motion.div id='mid' className={`step ${second.active && 'active-step'} ${second.done && 'done'}`}></motion.div>
                    <motion.div style={{ transition: 'all .3s linear', backgroundColor: second.done && '#fcaf17' }} className={`line `}></motion.div>
                    <motion.div id='last' className={`step ${third.active && 'active-step'} ${third.done && 'done'}`}></motion.div>
                </header>
                {first.active && <motion.form key='first-form' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ type: "keyframes", delay: .2 }} className='form'>
                    {usernameIsTouched && !usernameIsValid &&
                        <motion.span
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: [0, 0.5, 1], x: 0 }}
                            layout
                            className='validation-warning'>Username must be greater than 6 character</motion.span>
                    }
                    <motion.input
                        layout
                        onBlur={() => methods.setUsernameIsTouched(true)}
                        onChange={(e) => {
                            methods.setUsername(e.target.value)
                        }} className='input' type='text' placeholder='Username' />
                    {emailIsTouched && !emailIsValid &&
                        <motion.span layout className='validation-warning'>Email length must be greater than 8 and must contain "@" symbol</motion.span>
                    }
                    <motion.input
                        layout
                        onBlur={() => methods.setEmailIsTouched(true)}
                        onChange={(e) => {
                            methods.setEmail(e.target.value)
                        }} className='input' type='email' placeholder='Email' />
                </motion.form>
                }
                {second.active && <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='form'>
                    <div style={{ width: '100%', display: "flex", flexDirection: "column", gap: '10px', fontFamily: 'Shadows Into Light' }}>
                        <label style={{ color: 'white', fontSize: '1.3rem' }}>Birthday</label>
                        <input className='input' type='date' required />
                    </div>
                    <div style={{ width: '100%', display: "flex", flexDirection: "column", gap: '10px', fontFamily: 'Shadows Into Light' }}>
                        <label style={{ color: 'white', fontSize: '1.3rem' }}>Phone Number</label>
                        <input className='input' type='tel' required />
                    </div>
                </motion.form>
                }
                {third.active && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='form'>
                    <h3>Rockstar Games Policies & Terms</h3>
                    <span className='fedback-validation'>The use of this software is subject to the following policies and terms, including transfer of your data to countries that may have different levels of privacy protection than your own.</span>
                    <footer>
                        <input id='check' className='check' type='checkbox' required /><label htmlFor='check'>I have read and accepted the EULA, the Terms & Conditions, Code of Conduct, and the Privacy Policy, including the data transfer provisions.</label>
                    </footer>
                </motion.div>

                }
                {!third.done && < motion.button layout key='next-btn' exit={{ opacity: 0, y: 50 }} disabled={emailIsValid && usernameIsValid ? false : true} whileHover={{ fontWeight: 600 }} id='next-btn' onClick={forwardHandler}>Next</motion.button>}

            </div>
        </motion.section>
        {third.done && <UnfinishedAlert role='as' />}
    </AnimatePresence >
}