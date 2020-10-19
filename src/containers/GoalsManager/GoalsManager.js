import React , {Component} from 'react'
import Goals from '../../components/Goals/Goals'
import classes from './GoalsManager.module.css'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Modal from '../../components/UI/Modal/Modal'
import AddGoalMenu from '../../components/Goals/AddGoalMenu/AddGoalMenu'
import GoalTracker from '../../components/Goals/GoalTracker/GoalTracker'

class GoalsManager extends Component{

    state={
        goals:[
            {name:"Drinking water",
            days:['d','f','f','d','f','d','f','f','d','f',''],
            dayStatusClicked:[false,false,false,false,false],
            startDate:new Date()},
            {name:"Exercising",
            days:['d','d','d','d','d','d','f','f','d','f',''],
            dayStatusClicked:[false,false,false,false,false],
            startDate:new Date()}
        ],
        addingNewGoal:false,
        numOfGoalDays:10,
        goalName:'', //name of currently added goal
        goalViewed:false,
        viewedGoalIdx:0,
        
    }

    deleteGoalHandler=(idx)=>{
        const updatedGoals=[...this.state.goals];
        updatedGoals.splice(idx,1);
        this.setState({
            goals:updatedGoals
        })
    }

    openGoalMenuHandler=()=>{
        this.setState({
            addingNewGoal:true
        })
    }

    closeGoalMenuHandler=()=>{
        this.setState({
            addingNewGoal:false
        })
    }
    
    setNumOfDaysHandler=(event)=>{
        this.setState({
            numOfGoalDays:Number(event.target.value)
        })

        console.log(this.state.numOfGoalDays)
    }
    addNewGoalHandler=(numOfDays)=>{
        
        const days=Array(this.state.numOfGoalDays).fill('');
        console.log(days);
        const updatedGoals=[...this.state.goals,
            {name:this.state.goalName,
            days:days,
            dayStatusClicked:Array(this.state.numOfGoalDays).fill(false),
            startDate:new Date()}]
        this.setState({
            
            addingNewGoal:false,
            goals:updatedGoals
        })
    }

    getNewGoalNameHandler=(event)=>{
        this.setState({
            goalName:event.target.value
        })
    }

    viewGoalHandler=(idx)=>{
        const goalViewed=true;
        this.setState({
            goalViewed:goalViewed,
            viewedGoalIdx:idx
        })

    }

    closeGoalViewHandler=()=>{
        this.setState({
            goalViewed:false
        })
    }

    dayStatusClickedHandler=(dayIdx)=>{
        const dayStatusClicked=[...this.state.goals[this.state.viewedGoalIdx].dayStatusClicked]
        dayStatusClicked[dayIdx]=true;
        const goals=[...this.state.goals]
        goals[this.state.viewedGoalIdx].dayStatusClicked=dayStatusClicked;
        this.setState({
            goals:goals
        })
    }

    changeDayStatusHandler=(dayIdx,day)=>{
        
        let currentDay;
        console.log(day)
        if(day==='d')
            currentDay='f';
        else if(day==='f'||day==='')
            currentDay='d';
        console.log(currentDay)
        console.log(dayIdx)

        const goals=[...this.state.goals];
        goals[this.state.viewedGoalIdx].days[dayIdx]=currentDay;
        goals[this.state.viewedGoalIdx].dayStatusClicked[dayIdx]=false;
        this.setState({
            goals:goals
        })
        
    }

    


    
            


    render=()=>{
        const addGoalMenu=this.state.addingNewGoal ? (<Modal backdropClicked={this.closeGoalMenuHandler}>
                <AddGoalMenu added={this.addNewGoalHandler} 
                inputChanged={this.getNewGoalNameHandler}
                numOfDaysChecked={this.setNumOfDaysHandler}
                ></AddGoalMenu>
            </Modal>) : null;
        const goalView=this.state.goalViewed ? (
            <Modal backdropClicked={this.closeGoalViewHandler}>
                <GoalTracker name={this.state.goals[this.state.viewedGoalIdx].name}
                startDate={this.state.goals[this.state.viewedGoalIdx].startDate}
                statusChanged={this.changeDayStatusHandler}  
                days={this.state.goals[this.state.viewedGoalIdx].days}
                dayStatusClick={this.dayStatusClickedHandler}
                dayStatusClicked={this.state.goals[this.state.viewedGoalIdx].dayStatusClicked}
                  />
            </Modal>) : null;
        return(
        <Auxiliary>
            {addGoalMenu}
            {goalView}
            <div className={classes.GoalsManager}>
            <h1>My goals</h1>
            <Goals goals={this.state.goals} 
            deleted={this.deleteGoalHandler} 
            clicked={this.openGoalMenuHandler} 
            goalViewed={this.viewGoalHandler}
            />
        </div>
        </Auxiliary>
        )
        
    }
}

export default GoalsManager;