import React, { lazy} from 'react';
import {
    Switch,
    Route,
    withRouter,
} from "react-router-dom";


const loginPage =  lazy(() => import("../Pages/Login.js"));
const registerPage = lazy(() => import("../Pages/Register.js"));
const homePage = lazy(() => import("../Pages/Home"));
const profilePage = lazy(() => import("../Pages/Profile"));


export const login = '/';
export const Home = `/home`;
export const profile = '/profile';
export const registerForm = '/register'

const Routing = () => {
 

    return (
        <Switch>
          <Route exact  path={login} component={loginPage}  />
           <Route path={registerForm} component={registerPage} />
       
            <Route  path={Home} component={homePage}  />
            <Route path={profile} component={profilePage} />
      </Switch>
        
  
        
    )
}
export default withRouter(Routing);