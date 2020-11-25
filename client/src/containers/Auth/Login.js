import React, {Component} from 'react'
import {connect} from 'react-redux'

import TextInput from '../../components/UI/TextInput/TextInput'
import classes from './Login.module.css'
import Button from '../../components/UI/Button/Button'

import {registerUser, loginUser} from '../../store/actions/authActions'


class Login extends Component{
    state={
        isRegisterMenu:false,
        name:null,
        email:null,
        password:null,
        errMsg:null
    }

    componentDidUpdate(prevProps){
        const {error,isAuthenticated}=this.props;
        if(error !==prevProps.error){
            if(error.id==="REGISTER_FAIL" || error.id==="LOGIN_FAIL"){
                this.setState({errMsg:error.msg.msg})
            }
            else{
                this.setState({errMsg:null})
            }
        }

        if(isAuthenticated){
            this.props.history.push('/goals');
        }
    }

    toggleRegisterLoginHandler=()=>{
        this.setState({
            isRegisterMenu:!this.state.isRegisterMenu
        })
    }

    changeInputValueHandler=(name,event)=>{
        this.setState({
            [name]:event.target.value
        })
    }

    registerUserHandler=()=>{
        const {name,email,password}=this.state;
        const newUser={
            name,
            email,
            password
        }

        this.props.registerUser(newUser);
    }

    loginUserHandler=()=>{
        const {email,password}=this.state;
        const user={
            email,
            password
        }

        this.props.loginUser(user);
    }

    render(){
        const {isRegisterMenu} = this.state;
        const nameInput = isRegisterMenu ? (<div>
            <label className={classes.Label} htmlFor="name">Name:</label>
            <TextInput type="text" id="name"  changed={this.changeInputValueHandler}></TextInput>
        </div>): null;

        const errorBox=this.state.errMsg ? (<div className={classes.Error}>{this.state.errMsg}</div>):null;
        return(
            <div className={classes.Login}>
                
                <h1>{isRegisterMenu ? "Register":"Log In"}</h1>
                <form className={classes.Form}>
                    {errorBox}
                    {nameInput}
                    <div>
                        <label className={classes.Label} htmlFor="email">Email:</label>
                        <TextInput changed={this.changeInputValueHandler} type="email" id="email"></TextInput>
                    </div>
                    <div>
                        <label className={classes.Label} htmlFor="password">Password:</label>
                        <TextInput type="password" id="password" changed={this.changeInputValueHandler}></TextInput>
                    </div>
                    <Button clicked={isRegisterMenu ? this.registerUserHandler : this.loginUserHandler}>Submit</Button>
                    <Button clicked={this.toggleRegisterLoginHandler} 
                    btnType={isRegisterMenu?"Success":"Danger"} 
                    >{isRegisterMenu?"Log In":"Register"}</Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
        isAuthenticated:state.auth.isAuthenticated,
        error:state.error
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        registerUser:(user)=>dispatch(registerUser(user)),
        loginUser:(user)=>dispatch(loginUser(user))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);