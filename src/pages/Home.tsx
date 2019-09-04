import * as React from 'react';
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';


export default class Home  extends React.Component<any, any> {
    constructor(props:any){
        super(props);

        this.state={
            isAuth: false
        }
    }

    

    render(){
        return(
            <div className = "wrap">
                <div className="nav-brand">
                    <ul className="navbar-nav ml-auto">
                    
                        <li className="nav-item"><NavLink className = "nav-link" style={{color: "white"}} to="/login">Login</NavLink></li>
                        <li className="nav-item"><NavLink className = "nav-link" style={{color: "white"}} to="/registration">Registration</NavLink></li>
                        <li className="nav-item"><NavLink className = "nav-link" style={{color: "white"}} to="/kabinet">Mening Kabinetim</NavLink></li>
                    </ul>
                </div>
            
                
                
                
                
            </div>
        )
    }
}