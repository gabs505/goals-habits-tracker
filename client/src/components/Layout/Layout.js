import React , {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import Nav from '../../components/Nav/Nav'
import GoalsView from '../../containers/GoalsView/GoalsView'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import AddGoalMenu from '../../containers/AddGoalMenu/AddGoalMenu'
import GoalTracker from '../../containers/GoalTracker/GoalTracker'
import Overview from '../Overview/Overview'
import Login from '../../containers/Auth/Login'
import './Layout.css';


class GoalsManager extends Component{


    render=()=>{


        
        return(
        <Auxiliary>
            <Nav/>
            <main className="Content">
            <Switch>
                <Route path="/goals/add" exact component={AddGoalMenu}/>
                <Route path="/overview" component={Overview}/>
                <Route path="/goals/:id" render={(props)=><GoalTracker 
                
                {...props}
                />}/>
                <Route name="login" path="/login" component={Login}/>
                <Route path="/goals" exact component={GoalsView}/>
                <Redirect exact from="/goals-habits-tracker" to="login" />
                <Redirect exact from="/" to="login" />
                
            </Switch>
            </main>
            
            
        </Auxiliary>
        )
        
    }
}



export default GoalsManager;