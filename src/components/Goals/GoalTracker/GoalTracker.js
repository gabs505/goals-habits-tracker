import React from 'react'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Timeline from './Timeline/Timeline'
import ProgressBar from './ProgressBar/ProgressBar'

const goalTracker =(props)=>(
    <Auxiliary>   
        <h3>{props.name}</h3>
        <Timeline days={props.days}
        startDate={props.startDate} 
        dayStatusClick={props.dayStatusClick}
        dayStatusClicked={props.dayStatusClicked}
        dayStatusChanged={props.dayStatusChanged}
        statusChanged={props.statusChanged}  />

        <ProgressBar
        days={props.days}/>
    </Auxiliary>
    
)

export default goalTracker;