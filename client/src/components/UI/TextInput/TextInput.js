import React from 'react'
import classes from './TextInput.module.css'

const textInput = ({type,changed,id}) =>(
    <input type={type} id={id} onChange={(e)=>changed(id,e)}className={classes.TextInput}/>
)

export default textInput;