import React from 'react'

import Tick from '../../../../../../assests/images/tick.png'
import Ex from '../../../../../../assests/images/eks.png'
import classes from './Check.module.css'

const check=(props)=>{
    return props.tick==='' ? null : <img src={props.tick ? Tick : Ex}
    className={classes.Check} onClick={props.changed}></img>
    
    
    
}

export default check;