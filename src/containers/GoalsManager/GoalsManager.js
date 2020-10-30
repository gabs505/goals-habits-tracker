import React , {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import axios from 'axios'

import Goals from '../../components/Goals/Goals'
import classes from './GoalsManager.module.css'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Modal from '../../components/UI/Modal/Modal'
import AddGoalMenu from '../../components/Goals/AddGoalMenu/AddGoalMenu'
import GoalTracker from '../GoalTracker/GoalTracker'

// goals:[
//     // {name:"Drinking water",
//     // days:['d','f','f','d','f','d','f','f','d','f',''],
//     // dayStatusClicked:[false,false,false,false,false],
//     // startDate:new Date()},
//     // {name:"Exercising",
//     // days:['d','d','d','d','d','d','f','f','d','f',''],
//     // dayStatusClicked:[false,false,false,false,false],
//     // startDate:new Date()}
// ]

class GoalsManager extends Component{

    state={
        goals:[],
        addingNewGoal:false,
        goalDescription:'Default description',
        numOfGoalDays:10,
        goalName:'', //name of currently added goal
        goalViewed:false,
        viewedGoalIdx:0,
        
    }

    getGoalsHandler=()=>{
        
    }

    componentDidMount(){
        axios.get('http://localhost:5000/exercises/')
      .then(response => {
          const currentGoals=response.data.map(goal=>{
              const newGoal={};
              newGoal.name=goal.name;
              newGoal.description=goal.description;
              newGoal.progress=goal.progress;
              newGoal.duration=goal.duration;
              newGoal.dayStatusClicked=Array(goal.duration).fill(false);
              newGoal.startDate = new Date();
              newGoal.id = goal._id;
              return newGoal;
          })
        this.setState({
            goals:currentGoals
        })
      })
      .catch((error) => {
        console.log(error);
      })
    }

    
    deleteGoalHandler=(idx, id)=>{
        console.log(id);
        const updatedGoals=[...this.state.goals];
        axios.delete('http://localhost:5000/exercises/'+id)
            .then(res => {
                console.log(res.data)
                updatedGoals.splice(idx,1);
                this.setState({
                    goals:updatedGoals
                })
            });

        
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
    
    getGoalDescriptionHandler=(event)=>{
        this.setState({
            goalDescription:event.target.value
        })
    }

    setNumOfDaysHandler=(event)=>{
        this.setState({
            numOfGoalDays:Number(event.target.value)
        })

    }

    addNewGoalHandler=()=>{
        const days=Array(this.state.numOfGoalDays).fill('');
        const goal=
            {name:this.state.goalName,
            description:this.state.goalDescription,
            duration:this.state.numOfGoalDays,
            progress:Array(this.state.numOfGoalDays).fill('')}
        
        axios.post('http://localhost:5000/exercises/add', goal)
            .then(res => {
                console.log(res.data)
                axios.get('http://localhost:5000/exercises/')
            .then(response => {
                const currentGoals=response.data.map(goal=>{
                    const newGoal={};
                    newGoal.name=goal.name;
                    newGoal.description=goal.description;
                    newGoal.progress=goal.progress;
                    newGoal.duration=goal.duration;
                    newGoal.dayStatusClicked=Array(goal.duration).fill(false);
                    newGoal.startDate = new Date();
                    newGoal.id = goal._id;
                    return newGoal;
                })
              this.setState({
                  goals:currentGoals,
                  addingNewGoal:false
              })
            })
            .catch((error) => {
              console.log(error);
            })});

            

        // this.setState({
            
        //     addingNewGoal:false
        // })

        
    }

    updateGoalHandler=(id)=>{
        console.log(id);
        const goal=this.state.goals[this.state.viewedGoalIdx];
        const updatedGoal={};
        updatedGoal.name=goal.name;
        updatedGoal.description=goal.description;
        updatedGoal.duration=goal.duration;
        updatedGoal.progress=goal.progress;
        axios.post('http://localhost:5000/exercises/update/'+id, updatedGoal)
            .then(res => console.log(res.data));
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
        
        if(day==='d')
            currentDay='f';
        else if(day==='f'||day==='')
            currentDay='d';
        

        const goals=[...this.state.goals];
        goals[this.state.viewedGoalIdx].progress[dayIdx]=currentDay;
        goals[this.state.viewedGoalIdx].dayStatusClicked[dayIdx]=false;
        this.setState({
            goals:goals
        })
        
    }

        


    render=()=>{
        const addGoalMenu=this.state.addingNewGoal ? (<Modal backdropClicked={this.closeGoalMenuHandler}>
                <AddGoalMenu added={this.addNewGoalHandler} 
                inputChanged={this.getNewGoalNameHandler}
                descriptionHandler={this.getGoalDescriptionHandler}
                numOfDaysChecked={this.setNumOfDaysHandler}
                
                ></AddGoalMenu>
            </Modal>) : null;
        
        let goalView=null;
        let goalsManager=null;
        if(this.state.goals.length){
            goalView=(
            
                <GoalTracker goal={this.state.goals[this.state.viewedGoalIdx]}
                
                statusChanged={this.changeDayStatusHandler} 
                dayStatusClick={this.dayStatusClickedHandler}
                dayStatusClicked={this.state.goals[this.state.viewedGoalIdx].dayStatusClicked}
                submitGoalUpdate={this.updateGoalHandler}
                />
            )
            goalsManager=(
            <Auxiliary>
                {addGoalMenu}
            
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
        
        return(
        <Auxiliary>
            <Switch>
                <Route path="/goals/:id" render={()=>goalView}/>
                <Route path="/"  render={()=>goalsManager}/>
                
            </Switch>
            
        </Auxiliary>
        )
        
    }
}

export default GoalsManager;