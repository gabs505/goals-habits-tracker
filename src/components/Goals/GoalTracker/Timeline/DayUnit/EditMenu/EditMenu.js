import React from 'react'
import classes from './EditMenu.module.css'
import Check from '../Check/Check'

const editMenu=(props)=>(
    <div className={classes.EditMenu}>
        <Check changed={props.statusChanged.bind(this,'d')} tick={true} />
        <Check changed={props.statusChanged.bind(this,'f')} tick={false} />
    </div>
)

export default editMenu;