import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import classes from './Nav.module.css'

import Auxiliary from '../../hoc/Auxiliary/Auxiliary'

import {logout} from '../../store/actions/authActions'

const nav=(props)=>(
    <div className={classes.Nav}>
        <ul>
            <li className={classes.NavItem}><Link to="/goals">My Goals</Link></li>
            <li className={classes.NavItem}><Link to="/overview">Overview</Link></li>
            {/* <li className={classes.NavItem}><Link to="/login">Log In</Link></li> */}
            
        </ul>
        
            {props.isAuthenticated ? <div className={classes.Auth}>
                <span className={classes.AuthField}>{props.currentUser? `Hello ${props.currentUser.name}!`:null}</span>
                <span className={classes.AuthField} onClick={props.logoutHandler}><Link to="/login">Log Out</Link></span>
            </div>: <span className={classes.AuthField}><Link to="/login">Log In</Link></span>}
            
        
        

    </div>
)

const mapStateToProps=state=>{
    return{
        isAuthenticated:state.auth.isAuthenticated,
        currentUser:state.auth.user
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        logoutHandler:()=>dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(nav);
// export default nav;