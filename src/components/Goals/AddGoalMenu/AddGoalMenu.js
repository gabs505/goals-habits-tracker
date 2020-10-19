import React from 'react'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'

const addGoalMenu=props=>{
    return(
        <Auxiliary>
            <h2 style={{color:"initial"}}>Enter new goal name:</h2>
            <input type="text" onChange={(e)=>props.inputChanged(e)}></input>
            <div onChange={(e)=>props.numOfDaysChecked(e)}>
                <p>Select number of days:</p>
                <input type="radio" id="10" name="numofdays" value="10"
                defaultChecked
                />
                <label htmlFor="10">10</label>
                <input type="radio" id="20" name="numofdays" value="20"
                />
                <label htmlFor="20">20</label>
                <input type="radio" id="30" name="numofdays" value="30"
                 />
                <label htmlFor="30">30</label>
            </div>
            <div>
                <textarea></textarea>
            </div>
            
            
            <button style={{display:"block", padding:"10px", margin:"10px auto", width:"100px"}} 
            onClick={props.added}>Add</button>
        </Auxiliary>
    )
}

export default addGoalMenu;