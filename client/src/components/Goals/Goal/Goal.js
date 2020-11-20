import React from 'react'
import {Link} from 'react-router-dom'

import classes from './Goal.module.css'



const goal=(props)=>{
    return(
        <div className={classes.Goal}>
            <div className={[classes.GoalName, classes.Box].join(' ')}><p>{props.name}</p></div>
            <Link to={"/goals/"+props.id}>
                <div className={[classes.View, classes.Box].join(' ')}
                onClick={props.viewed}>see</div>
            </Link>
            <div className={[classes.Delete, classes.Box].join(' ')} onClick={props.deleted}>delete</div>
        </div>
    )
}

export default goal;