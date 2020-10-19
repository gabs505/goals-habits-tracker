import React from 'react'
import classes from './DayUnit.module.css'
import EditMenu from './EditMenu/EditMenu'
import Check from './Check/Check'

const calculateDateHandler=(goalDate,dayNum)=>{
    let currentDate=goalDate;
    const months=["Jan","Febr","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const days=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

    let currentMonthDays;//number of days in current month
    if(currentDate.getMonth()+1<=11)
        currentMonthDays=new Date(currentDate.getFullYear(),currentDate.getMonth()+1,0).getDate();
    else
        nextMonthDays=new Date(currentDate.getFullYear()+1,0,0).getDate();//days of december

    let nextMonthDays;
    if(currentDate.getMonth()+2<=11)
        nextMonthDays=new Date(currentDate.getFullYear(),currentDate.getMonth()+2,0).getDate();
    else
        nextMonthDays=new Date(currentDate.getFullYear()+1,0,0).getDate();//days of december
    
    let newDate;
    let newDay=currentDate.getDate()+dayNum-1;
    let newMonth=months[currentDate.getMonth()];
    
    if(newDay>currentMonthDays) {
        newDay-=currentMonthDays;
        newMonth=months[(currentDate.getMonth()+1)%11];
    }
    
    return `${newMonth} ${newDay}`;   
}



const dayUnit =props=>{
    const day=calculateDateHandler(props.startDate,props.number);
    return(
    <div className={classes.DayUnit}>
        <div className={classes.Number}>{day}</div>
        <div className={classes.DayField} onClick={props.statusChanged.bind(this,props.number-1,props.day)}>
            <Check tick={props.status}/>
        </div>
        {/* {props.statusClicked[props.number-1] ? <EditMenu statusChanged={props.statusChanged.bind(this,props.number-1)}/> : null} */}
        
    </div>
    )
}
    


export default dayUnit;