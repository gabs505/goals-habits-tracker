import * as actionTypes from '../actions/actionTypes'

const initialState={
    goals:[],
    viewedGoalIdx:0,
};

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case(actionTypes.DELETE_GOAL):

            let updatedGoals=[...state.goals];
            updatedGoals.filter(({id})=>id!==action.id)
            return{
                ...state,
                goals:updatedGoals
            }

        case(actionTypes.ADD_GOAL):
            const newGoal={
                name:action.goalSetup.name,
                description:action.goalSetup.description,
                duration:action.goalSetup.duration,
                startDate:action.goalSetup.startDate,
                dayStatusClicked:Array(action.goalSetup.duration).fill('false'),
                progress:Array(action.goalSetup.duration).fill(''),
                id:action.goalSetup.name,

                userId:action.goalSetup.userId
            }
            const newGoals=[...state.goals,newGoal]
            return{
                ...state,
                goals:newGoals
            }
        case(actionTypes.UPDATE_GOAL):
            const updatedGoal={...state.goals.find(goal=>goal.id===action.goalId)}
        
            updatedGoal.progress[action.dayIdx]=action.value;
            let goals=[...state.goals];
            goals.splice(action.goalIdx,1,updatedGoal)
            return{
                ...state,
                goals:goals
            }
            
        case(actionTypes.INIT_GOALS):
            return{
                ...state,
                goals:action.goals
            }      
        default:
            return state;
    }
    
}
export default reducer;