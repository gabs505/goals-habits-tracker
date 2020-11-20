import React from 'react'
import classes from './ShowDiv.module.css'

const showDiv=props=>(
    <div onClick={props.click} 
    className={[classes.ShowDiv, props.isClicked ? classes.clicked : ''].join(' ')}
        >{props.children}</div>
)

export default showDiv;