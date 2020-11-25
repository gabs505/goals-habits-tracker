import React, {useState, useEffect} from 'react'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Goals from '../../components/Goals/Goals'
import Modal from '../../components/UI/Modal/Modal'
import Button from '../../components/UI/Button/Button'
import classes from './GoalsView.module.css'

import {connect} from 'react-redux'

import {setGoals, deleteGoal} from '../../store/actions/actions'


const GoalView=props=>{
    const [deletedId,setDeletedId] = useState(null);
    const [isModalActive,setIsModalActive] = useState(false);
    useEffect(()=>{
        if(props.isAuthenticated)
            props.getGoalsHandler(props.user.id);
            
    
    },[isModalActive, props.isAuthenticated])
    const deleteGoalHandler=()=>{
        props.deleteGoalHandler(deletedId)
        setIsModalActive(false);
    }

    const quitDeleteGoalModal=()=>{
        setIsModalActive(false);
        setDeletedId(null); 
    }
    const deleteClickedHandler=(id)=>{
        setDeletedId(id);
        setIsModalActive(true); 
    }

    const deleteModal= isModalActive ? <Modal backdropClicked={quitDeleteGoalModal}>
        <h2>Are you sure you want to delete this goal?</h2>
        <Button clicked={deleteGoalHandler} btnType="Success">Yes</Button>
        <Button clicked={quitDeleteGoalModal} btnType="Danger">No</Button>
    </Modal>: null;

    return props.isAuthenticated ? (<Auxiliary>{deleteModal}
                <div className={classes.GoalsView}>
                <h1>My goals</h1>
                <Goals
                deleted={deleteClickedHandler}
                />
                </div>
                </Auxiliary>
            ) : <h1>Please log in to see your goals</h1> 
                
        
    
}

const mapStateToProps=state=>{
    return{
        isAuthenticated: state.auth.isAuthenticated,
        user:state.auth.user
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        getGoalsHandler:(userId)=>dispatch(setGoals(userId)),
        deleteGoalHandler:(id)=>dispatch(deleteGoal(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(GoalView);