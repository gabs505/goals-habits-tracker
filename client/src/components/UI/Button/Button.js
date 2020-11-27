import React from 'react'
import classes from './Button.module.css'

const button=(props)=>(
    <div className={[classes.Button,classes[props.btnType]].join(' ')} 
    onClick={(e)=>{props.clicked()}}>{props.children}</div>
)

export default button;