import React, {Component} from 'react'
import {connect} from 'react-redux'

import Timeline from '../../components/Goals/GoalTracker/Timeline/Timeline'
import ProgressBar from '../../components/Goals/GoalTracker/ProgressBar/ProgressBar'
import Button from '../../components/UI/Button/Button'
import ShowDiv from '../../components/UI/ShowDiv/ShowDiv'

import classes from './GoalTracker.module.css'
import axios from '../../axios/axios'

import {updateGoal} from '../../store/actions/actions'


class GoalTracker extends Component{
    state={
        progress:[],
        showDescription:false
    }


    updateGoalInDatabaseHandler=()=>{
        const id=this.props.match.params.id;
        const goal=this.props.goals.find(goal=>goal.id===id);
        const updatedGoal={};
        updatedGoal.name=goal.name;
        updatedGoal.description=goal.description;
        updatedGoal.duration=goal.duration;
        updatedGoal.progress=goal.progress;
        updatedGoal.startDate=goal.startDate;
        
        axios.post('goals/update/'+id, updatedGoal)
            .then(res => {
                this.props.history.push('/goals')
            });
    }
        
    

    showDescriptionHandler=()=>{
        this.setState({
            showDescription:!this.state.showDescription
        })
    }

    changeDayStatusHandler=(dayIdx,day)=>{
        let currentDay;
        
        if(day==='d')
            currentDay='f';
        else if(day==='f'||day==='')
            currentDay='d';
        
        const id=this.props.match.params.id;

        this.props.submitGoalChangesHandler(id,dayIdx,currentDay);
    }


    render(){
        
        if(this.props.goals){
            let goal=this.props.goals.find(goal=>goal.id===this.props.match.params.id);
        
            return(
            
                <div className={classes.GoalTracker}>   
                <h2>{goal.name}</h2>
                <Timeline days={goal.progress}
                startDate={goal.startDate} 
                statusChanged={this.changeDayStatusHandler}  />
        
                <ShowDiv click={this.showDescriptionHandler} isClicked={this.state.showDescription}>Show Description</ShowDiv>
                {this.state.showDescription ?
                (<div className={classes.Description}>
                    <div>{goal.description}</div>
                </div>) : null
                }
                
                    <ProgressBar
                    days={goal.progress}/>
                    {/* <Button clicked={()=>props.submitGoalUpdate(props.goal.id)}>Submit changes</Button> */}
                    <Button clicked={this.updateGoalInDatabaseHandler}>Save changes</Button>
                </div>

                
            
            
        )
        }
        else{
            return null;
        }
    
    
}
}

const mapStateToProps=state=>{
    return{
        goals:state.goal.goals
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        submitGoalChangesHandler:(goalId,dayIdx,value)=>dispatch(updateGoal(goalId,dayIdx,value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoalTracker);