import React from 'react'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Button from '../../UI/Button/Button'
import classes from './AddGoalMenu.module.css'

const addGoalMenu=props=>{
    return(
        <Auxiliary>
            <div className={classes.Menu}>
                <h2 style={{color:"initial"}}>Enter new goal name:</h2>
                <input type="text" onChange={(e)=>props.inputChanged(e)}></input>
                <div onChange={(e)=>props.numOfDaysChecked(e)}>
                    <p>Select number of days:</p>
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
                <div onChange={(e)=>props.descriptionHandler(e)}>
                    <textarea></textarea>
                </div>
                <Button clicked={props.added}>Add</Button>
            </div>
            
            
            
            {/* <button style={{display:"block", padding:"10px", margin:"10px auto", width:"100px"}}  */}
            
        </Auxiliary>
    )
}

export default addGoalMenu;