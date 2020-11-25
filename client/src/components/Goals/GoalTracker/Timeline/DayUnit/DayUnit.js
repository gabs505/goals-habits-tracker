import React from 'react'
import classes from './DayUnit.module.css'
import Check from './Check/Check'

const calculateDateHandler=(goalDate,dayNum)=>{
    let currentDate=goalDate;
    const months=["Jan","Febr","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    // const days=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

    let currentMonthDays;//number of days in current month
    let nextMonthDays;

    if(currentDate.getMonth()+1<=11)
        currentMonthDays=new Date(currentDate.getFullYear(),currentDate.getMonth()+1,0).getDate();
    else
        currentMonthDays=new Date(currentDate.getFullYear()+1,0,0).getDate();//days of december

    if(currentDate.getMonth()+2<=11)
        nextMonthDays=new Date(currentDate.getFullYear(),currentDate.getMonth()+2,0).getDate();
    else
        nextMonthDays=new Date(currentDate.getFullYear()+1,0,0).getDate();//days of december
    
    let newYear=currentDate.getFullYear();
    let newDay=currentDate.getDate()+dayNum-1;
    let newMonth=months[currentDate.getMonth()];
    let newMonthNumber=currentDate.getMonth()
    
    if(newDay>currentMonthDays) {
        newDay-=currentMonthDays;
        newMonth=months[(currentDate.getMonth()+1)%12];
        newMonthNumber=(currentDate.getMonth()+1)%12;
        
    }
    let isAvailable=false;
    const todaysDate=new Date();
    if(todaysDate.getFullYear()===newYear){
        if(newMonthNumber<todaysDate.getMonth()){
            isAvailable=true;
        }
        else if(newMonthNumber===todaysDate.getMonth()){
            if(newDay<=todaysDate.getDate()){
                isAvailable=true;
            }
        }
    }
    
    return {newMonth, newDay, isAvailable};   
}




const dayUnit =props=>{
    const day=calculateDateHandler(props.startDate,props.number);
    return(
    <div className={classes.DayUnit}>
        <div className={classes.Number}>{`${day.newMonth} ${day.newDay}`}</div>
        <div className={[classes.DayField, day.isAvailable ? '' : classes.Disabled].join(' ')} 
        onClick={day.isAvailable ? props.statusChanged.bind(this,props.number-1,props.day): null}>
            <Check tick={props.status}/>
        </div>
        {/* {props.statusClicked[props.number-1] ? <EditMenu statusChanged={props.statusChanged.bind(this,props.number-1)}/> : null} */}
        
    </div>
    )
}
    


export default dayUnit;