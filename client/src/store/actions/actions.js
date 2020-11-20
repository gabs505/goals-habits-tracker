import {DELETE_GOAL,ADD_GOAL,UPDATE_GOAL, INIT_GOALS} from './actionTypes'
import axios from 'axios'
import {tokenConfig} from '../actions/authActions'


export const deleteGoal=(id)=>(dispatch,getState)=>{
    axios.delete('http://localhost:5000/goals/'+id,tokenConfig(getState))
            .then(res => {
                
            })
            .catch(err=>{
                console.log(err)
            console.log('hello')});
    dispatch({
        type:DELETE_GOAL,
        id:id
    })
}


export const addGoal=(goal)=>{
    return (dispatch,getState)=>{
        axios.post('http://localhost:5000/goals/add', goal, tokenConfig(getState))
            .then(res => {
                // dispatch({
                //     type:ADD_GOAL,
                //     goalSetup:goal
                // })  
            })
            .catch(err=>console.log(err));
    }
}


export const updateGoal=(goalId,dayIdx,value)=>{
    return{
        type:UPDATE_GOAL,
        goalId:goalId, 
        dayIdx:dayIdx, 
        value:value
    }
}


export const setGoals=(userId)=>{
    return (dispatch,getState)=>{
        
        axios.get('http://localhost:5000/goals/')
      .then(response => {
        
        // console.log(response.data)
          const currentGoals=response.data.map(goal=>{
              if(goal.userId===userId){
                const newGoal={};
                newGoal.name=goal.name;
                newGoal.description=goal.description;
                newGoal.progress=goal.progress;
                newGoal.duration=goal.duration;
                newGoal.dayStatusClicked=Array(goal.duration).fill(false);
                newGoal.startDate = new Date(Date.parse(goal.startDate));
                newGoal.id = goal._id;

                newGoal.userId=goal.userId;
                return newGoal;
              }
              
          }).filter(goal=>goal!==undefined)
          console.log(currentGoals)
          
        dispatch({
            type:INIT_GOALS,
            goals:currentGoals[0]? currentGoals : []
        });
      })
      .catch((error) => {
        console.log(error);
      })
    }
}