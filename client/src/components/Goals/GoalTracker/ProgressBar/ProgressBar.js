import React from 'react'
import classes from './ProgressBar.module.css'

const progressBar=props=>{
    const successedNum=props.days.filter((day)=>{
        return day==='d';
    }).length;
    const successedPercent=(successedNum/props.days.length)*100;
    return(
        <div className={classes.ProgressBar}>
            <p>{`${successedPercent.toFixed(1)}%`}</p>
            <div className={classes.BarFill} style={{width:`${successedPercent}%`}}></div>
        </div>
    )
}

export default progressBar;