import React from 'react'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'

const addGoalMenu=props=>{
    return(
        <Auxiliary>
            <h2 style={{color:"initial"}}>Enter new goal name:</h2>
            <input type="text" onChange={(e)=>props.inputChanged(e)}></input>
            <button style={{display:"block", padding:"10px", margin:"10px auto", width:"100px"}} 
            onClick={props.added}>Add</button>
        </Auxiliary>
    )
}

export default addGoalMenu;