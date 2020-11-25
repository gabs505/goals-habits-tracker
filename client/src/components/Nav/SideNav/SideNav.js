import React,{ Component }from 'react';
import { slide as Menu } from 'react-burger-menu';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'


import {logout} from '../../../store/actions/authActions'
import './SideNav.css'


class SideNav extends Component{

    state={
        isMenuOpen:false
    }

    handleStateChange (state) {
        this.setState({isMenuOpen: state.isOpen})  
    }

    closeMenuHandler=()=>{
        this.setState({
            isMenuOpen:false
        })
    }
    render(){

        return (
            <Menu isOpen={this.state.isMenuOpen}
            onStateChange={(state) => this.handleStateChange(state)}
            >
              
                    <Link onClick={this.closeMenuHandler} to="/goals">Goals</Link>
                    <Link onClick={this.closeMenuHandler} to="/overview">Overview</Link>
                    {this.props.isAuthenticated ?
                    <Link onClick={()=>{this.props.logoutHandler(); this.closeMenuHandler()}} to="/login">Log Out</Link>
                    : <Link onClick={this.closeMenuHandler} to="/login">Log In</Link>}
                
            </Menu>
          );

    }
  
};



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

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
