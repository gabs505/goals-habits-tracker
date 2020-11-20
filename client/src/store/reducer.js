import * as actionTypes from './actions/actionTypes'

const initialState={
    goals:null,
    viewedGoalIdx:0,
    // goals:[
    // { name:"Drinking water",
    //     progress:['d','f','f','d','f','d','f','f','d','f',''],
    //     duration:11,
    //     description:'tralala',
    //     dayStatusClicked:[false,false,false,false,false],
    //     startDate:new Date(),
    //     id:1,
    // },

    // {name:"Exercising",
    //     progress:['d','d','d','d','d','d','f','f','d','f',''],
    //     duration:11,
    //     description:'tralala',
    //     dayStatusClicked:[false,false,false,false,false],
    //     startDate:new Date(),
    //     id:2
    // }

    // ]
};

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case(actionTypes.DELETE_GOAL):

            let updatedGoals=[...state.goals];
            updatedGoals.splice(action.idx,1);
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
                id:action.goalSetup.name
            }
            return{
                ...state,
                goals:[...state.goals,newGoal]
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