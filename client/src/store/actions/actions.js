import {DELETE_GOAL,ADD_GOAL,UPDATE_GOAL, INIT_GOALS} from './actionTypes'
import axios from '../../axios/axios'
import {tokenConfig} from '../actions/authActions'


export const deleteGoal=(id)=>(dispatch,getState)=>
{ return new Promise((resolve,reject)=>{
    axios.delete('goals/'+id,tokenConfig(getState))
            .then(res => {
                dispatch({
                    type:DELETE_GOAL,
                    id:id
                })
                resolve(res);

            })
            .catch(err=>{
                console.log(err)
            });
})
     
    
}
    
    



export const addGoal=(goal,history)=>{
    return (dispatch,getState)=>{
        
        axios.post('goals/add', goal, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type:ADD_GOAL,
                    goalSetup:goal
                }) 
                 history.push('/goals')
                
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
        
        axios.get('goals/')
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
          
        dispatch({
            type:INIT_GOALS,
            goals:currentGoals[0]? currentGoals : []
        });
      })
      .catch((error) => {
        
      })
    }
}