import React from 'react'
import classes from './DayUnit.module.css'
import EditMenu from './EditMenu/EditMenu'
import Check from './Check/Check'

const dayUnit =props=>(
    <div className={classes.DayUnit}>
        <div className={classes.Number}
        onClick={()=>{props.statusChanged(1,'d');}}>{props.number}</div>
        <div className={classes.DayField} onClick={props.statusClick.bind(this,props.number-1)}>
            <Check tick={props.status}/>
        </div>
        {props.statusClicked[props.number-1] ? <EditMenu statusChanged={props.statusChanged.bind(this,props.number-1)}/> : null}
        
    </div>
)

export default dayUnit;