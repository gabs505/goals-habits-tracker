import React from 'react'
import {Link} from 'react-router-dom'
import classes from './Nav.module.css'

const nav=()=>(
    <div className={classes.Nav}>
        <ul>
            <li className={classes.NavItem}><Link to="/">My Exercises</Link></li>
            <li className={classes.NavItem}><Link>Overwiew</Link></li>
            
        </ul>

    </div>
)


export default nav;