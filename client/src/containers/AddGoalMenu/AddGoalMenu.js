import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import DatePicker from 'react-datepicker';


import "react-datepicker/dist/react-datepicker.css";

import {connect} from 'react-redux'

import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Button from '../../components/UI/Button/Button'
import TextInput from '../../components/UI/TextInput/TextInput'
import classes from './AddGoalMenu.module.css'

import {addGoal} from '../../store/actions/actions'


class AddGoalMenu extends Component{
    state={
        goalName:'',
        goalDescription:'',
        numOfGoalDays:10,
        startDate: new Date(),
    }

    setGoalNameHandler=(name,event)=>{
        this.setState({
            goalName:event.target.value
        })
    }

    setGoalDescriptionHandler=(event)=>{
        this.setState({
            goalDescription:event.target.value
        })
    }

    setNumOfGoalDaysHandler=(event)=>{
        this.setState({
            numOfGoalDays:Number(event.target.value)
        })

    }

    setStartDateHandler=(date)=>{
        this.setState({
            startDate:date
        })

    }
    

    addNewGoalHandler=()=>{
        const {user}=this.props;
        let userId=null;
        if(user){
            userId=user.id;
            console.log("User")
        }
        const goal=
            {name:this.state.goalName,
            description:this.state.goalDescription,
            duration:this.state.numOfGoalDays,
            progress:Array(this.state.numOfGoalDays).fill(''),
            startDate:this.state.startDate,
            userId:userId}
        
            this.props.addNewGoal(goal)
            
            
        
    }

    render(){
        return(
            <Auxiliary>
                <div className={classes.Menu}>
                    <h2 style={{color:"initial", margin:"auto"}}>Add new goal</h2>
                    <div className={classes.Container}>
                        <p>Enter goal name:</p>
                        <TextInput type="text" withLabel={false} changed={this.setGoalNameHandler} />
                    </div>
                    
                    
                    <div className={classes.Container}>
                        <p>Choose start date:</p>
                        <div>
                            <DatePicker
                            className={classes.Input}
                            selected={this.state.startDate} 
                            onChange={date => this.setStartDateHandler(date)}
                            />
                        </div>
                        
                    </div>   
                        
                    
                    <div className={classes.Container} onChange={(e)=>this.setNumOfGoalDaysHandler(e)}>
                        <p>Select goal duration in days:</p><br />
                        <input type="radio" id="10" name="duration" value="10"
                        defaultChecked
                        />
                        <label htmlFor="10">10</label>
                        <input type="radio" id="20" name="duration" value="20"
                        />
                        <label htmlFor="20">20</label>
                        <input type="radio" id="30" name="duration" value="30"
                        />
                        <label htmlFor="30">30</label>
                    </div>
                    <div className={classes.Container} >
                        <p>Enter goal description:</p>
                        <textarea onChange={(e)=>this.setGoalDescriptionHandler(e)} className={classes.Input}></textarea>
                    </div>
                    <Link to="/goals">
                    <Button clicked={this.addNewGoalHandler}>Add</Button>
                    </Link>
                    
                </div>
                
                
                
                {/* <button style={{display:"block", padding:"10px", margin:"10px auto", width:"100px"}}  */}
                
            </Auxiliary>
        )
        }
    
}

const mapStateToProps=state=>{
    return{
        user:state.auth.user
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        addNewGoal:(goalSetup)=>dispatch(addGoal(goalSetup))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddGoalMenu);
// export default AddGoalMenu;