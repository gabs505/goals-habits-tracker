import React, {Component} from 'react'
import axios from 'axios'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Timeline from '../../components/Goals/GoalTracker/Timeline/Timeline'
import ProgressBar from '../../components/Goals/GoalTracker/ProgressBar/ProgressBar'
import Button from '../../components/UI/Button/Button'


class GoalTracker extends Component{
    state={
        goal:{}
    }

    componentDidMount(){
        
    }

    render(){
        const goal=this.props.goal;
        return(
            <Auxiliary>   
        <h2>{goal.name}</h2>
        <Timeline days={goal.progress}
        startDate={goal.startDate} 
        dayStatusClick={this.props.dayStatusClick}
        dayStatusClicked={this.props.dayStatusClicked}
        dayStatusChanged={this.props.dayStatusChanged}
        statusChanged={this.props.statusChanged}  />

    <Button>Show Description</Button>
        <ProgressBar
        days={goal.progress}/>
        <Button clicked={()=>this.props.submitGoalUpdate(goal.id)}>Submit changes</Button>
    </Auxiliary>
    
    )
    }
}
    

export default GoalTracker;