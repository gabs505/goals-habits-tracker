import React from 'react'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Timeline from './Timeline/Timeline'

const goalTracker =(props)=>(
    <Auxiliary>   
        <h3>{props.name}</h3>
        <Timeline days={props.days} 
        dayStatusClick={props.dayStatusClick}
        dayStatusClicked={props.dayStatusClicked}
        dayStatusChanged={props.dayStatusChanged}
        statusChanged={props.statusChanged}  />
    </Auxiliary>
    
)

export default goalTracker;