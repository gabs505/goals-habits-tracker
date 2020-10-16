import React from 'react'
import Goal from './Goal/Goal'
import classes from './Goals.module.css'

const goals=(props)=>{
    return(
        <div className={classes.Goals}>
            {props.goals.map((goal,idx)=>(
                
                <Goal key={goal.name+idx}
                 name={goal.name} 
                 deleted={props.deleted.bind(this,idx)}
                 viewed={props.goalViewed.bind(this,idx)}/>
            )
                
                
            )}
            <button onClick={props.clicked}>Add new goal</button>
        </div>
        
    )
}

export default goals;