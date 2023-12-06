import { Component } from "react";
import './unfinished.scss'
import rockstar from '../../assets/icons/rockstar-logo.png'
import { motion } from 'framer-motion'
import { Link } from "react-router-dom";

export default class UnfinishedAlert extends Component {
    render() {
        return <>
            <motion.header initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 }} className={` ${this.props.role === 'as' ? 'as-component' : "warning-box"}`}>
                < h1 >Website is in test mode and  does not have consummate functionalities and Design.</h1 >
                <Link to='/'><img src={rockstar} alt="rockstar" /></Link>
            </motion.header >
        </>
    }
}