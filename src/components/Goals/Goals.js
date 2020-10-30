import React from 'react'

import Goal from './Goal/Goal'
import classes from './Goals.module.css'

const goals=(props)=>{
    return(
        <div className={classes.Goals}>
            {props.goals.map((goal,idx)=>{
                
                return(
                <Goal key={idx}
                id={goal.id}
                 name={goal.name} 
                 deleted={props.deleted.bind(this,idx,goal.id)}
                 viewed={props.goalViewed.bind(this,idx)}/>
            )
                
                
                })}
            <button style={{fontFamily: "inherit"}}onClick={props.clicked}>Add new goal</button>
        </div>
        
    )
}

export default goals;