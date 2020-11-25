import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import classes from './Nav.module.css'

import BurgerMenu from './BurgerMenu/BurgerMenu'

import {logout} from '../../store/actions/authActions'

const Nav=(props)=>{
    const [isSideNavActive,setIsSideNavActive]=useState(false)
    return(
    <div className={classes.Nav}>
        <BurgerMenu clicked={()=>setIsSideNavActive(!isSideNavActive)} active={isSideNavActive} />
        
            <ul className={isSideNavActive?[classes.NavContent]:[classes.NavContent,classes.hidden].join(' ')}>
                <li onClick={()=>setIsSideNavActive(false)} className={classes.NavItem}><Link to="/goals">Goals</Link></li>
                <li onClick={()=>setIsSideNavActive(false)} className={classes.NavItem}><Link to="/overview">Overview</Link></li>
                {props.isAuthenticated ?
                    <li className={classes.NavItem} onClick={()=>{props.logoutHandler();setIsSideNavActive(false)}}><Link to="/login">Log Out</Link></li>
                    : <li className={classes.NavItem} onClick={()=>setIsSideNavActive(false)}><Link to="/login">Log In</Link></li>
                }
                
            </ul>
            
                { props.currentUser ? <span className={classes.HelloItem}>{`Hello ${props.currentUser.name}!`}</span> : null}
                   
        
        
            
        
        

    </div>
)
    }

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

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
// export default nav;