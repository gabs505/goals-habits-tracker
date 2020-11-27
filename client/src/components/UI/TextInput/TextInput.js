import React from 'react'
import classes from './TextInput.module.css'

const textInput = props =>{
    let label=null;
    if(props.withLabel){
        label=<label className={classes.Label}>
            {props.name}</label>
    }

    let inputClasses=[classes.TextInput];
    if(!props.valid && props.touched){
        inputClasses.push(classes.Invalid);
    }

    let errInfo=null;
    if(props.validationErrInfo!==""){
        errInfo=<div className={classes.ErrorInfo}>{props.validationErrInfo}</div>
    }
    return(
    <div>
        {label}
        <input className={inputClasses.join(' ')}
        type={props.type} value={props.value}
        id={props.name} 
        autoComplete={props.type} 
        onChange={(e)=>props.changed(props.id,e)} 
        />
        {errInfo}
    </div>
    )
}
    
    


export default textInput;