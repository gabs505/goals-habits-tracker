import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Goal from './Goal/Goal'
import classes from './Goals.module.css'

import {deleteGoal} from '../../store/actions/actions'

const goals=(props)=>{
    return(
        <div className={classes.Goals}>
            {props.goals ? 
            props.goals.map((goal,idx)=>{
                
                return(
                <Goal key={idx}
                id={goal.id}
                 name={goal.name} 
                 deleted={()=>props.deleted(goal.id)}
                 />
            )
                
                
                }): null}
                <Link to="/goals/add"><button style={{fontFamily: "inherit", outline:"none"}}onClick={props.clicked}>Add new goal</button></Link>
            
        </div>
        
    )
}

const mapStateToProps=state=>{
    return{
        goals:state.goal.goals
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        deleteGoalHandler:(idx)=>dispatch(deleteGoal(idx))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(goals);