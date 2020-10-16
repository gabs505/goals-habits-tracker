import React , {Component} from 'react'
import Goals from '../../components/Goals/Goals'
import classes from './GoalsManager.module.css'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Modal from '../../components/UI/Modal/Modal'
import AddGoalMenu from '../../components/Goals/AddGoalMenu/AddGoalMenu'

class GoalsManager extends Component{

    state={
        goals:[
            {name:"Drinking water"},
            {name:"Exercising"}
        ],
        addingNewGoal:false,
        goalName:'' //name of currently added goal
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

    addNewGoalHandler=()=>{
        const updatedGoals=[...this.state.goals,{name:this.state.goalName}]
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


    
            


    render=()=>{
        const goalMenu=this.state.addingNewGoal ? (<Modal>
                <AddGoalMenu added={this.addNewGoalHandler} inputChanged={this.getNewGoalNameHandler}></AddGoalMenu>
            </Modal>) : null;
        return(
        <Auxiliary>
            {goalMenu}
            <div className={classes.GoalsManager}>
            <h1>My goals</h1>
            <Goals goals={this.state.goals} deleted={this.deleteGoalHandler} clicked={this.openGoalMenuHandler} />
        </div>
        </Auxiliary>
        )
        
    }
}

export default GoalsManager;