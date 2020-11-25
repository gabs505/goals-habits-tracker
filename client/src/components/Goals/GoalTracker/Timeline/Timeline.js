import React from 'react'
import DayUnit from './DayUnit/DayUnit'
import classes from './Timeline.module.css'


const timeline=props=>(
    <div className={classes.Timeline}>
        {props.days.map((day,idx)=>{
            let status=''; 
            switch (day){
                case 'd':
                    status=true;
                    break;
                case 'f':
                    status=false;
                    break;
                default:
                    status='';
                    break;
            }
            return <DayUnit 
            day={day}
            status={status}
            key={idx} 
            number={idx+1}
            startDate={props.startDate}
            statusChanged={props.statusChanged}
            />
        })
        }
    </div>
)

export default timeline;