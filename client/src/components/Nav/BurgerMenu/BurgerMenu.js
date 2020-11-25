import React, {useState, useEffect} from 'react'
import classes from './BurgerMenu.module.css'

const BurgerMenu=(props)=>{
    const [isMenuActive,setIsMenuActive]=useState(false);

    useEffect(()=>{
        setIsMenuActive(props.active)
    },[props.active])
    const toggleMenuHandler=()=>{
        setIsMenuActive(!isMenuActive)
    }
    return(
        <button onClick={()=>{toggleMenuHandler();props.clicked()}} 
        className={isMenuActive ? [classes.BurgerButton,classes.active].join(' ') : classes.BurgerButton}>
            <div className={classes.BurgerInner}>

            </div>
        </button>
    )
}

export default BurgerMenu;