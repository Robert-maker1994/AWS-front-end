import React, { useState, createContext, useContext } from "react";
import { IconButton, InputAdornment, Grid, TextField } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { Home, profile, registerForm } from "../routing/routing";
import { API, Auth } from "aws-amplify";
import "./login.scss";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import UserContext from "../context/UserContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [unsuccessful, setUnsuccessful] = useState(true);
  const { user, setUser } = useContext(UserContext);
  let history = useHistory();

  console.log("this is the ", user);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const SubmitLogin = async () => {
    try {
      // Auth
      console.log(email);
      const data = await Auth.signIn(email, password);
      const init = {
        body: { email, userpoolid: data.pool.userPoolId, username: data.username },
        headers: {},
      };
      API.post("chefapp08", "/user", init)
        .then((response) => {
          // Add your code here
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response);
        });
      setUser(data);
      if (data) {
        history.push(Home);
      }
    } catch (error) {
      if (error) {
        setUnsuccessful(false);
      }
      console.log("error signing in", error.message);
    }
  };

  console.log("this is the user context", user);

  return (
    <div className="background">
      <Grid className="container">
        <div className="form-container">
          <h1>Please Login</h1>
          <div className="margin">
            <TextField
              className="input"
              label="Email"
              variant="outlined"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <Grid primary="true" className="margin">
            <TextField
              label="Password"
              variant="outlined"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {/*Icon button */}
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {!unsuccessful ? <p>Incorrect Username or Password</p> : null}
          </Grid>

          <Grid>
            <button type="submit" className="button" onClick={SubmitLogin}>
              {" "}
              Login{" "}
            </button>
            <Link className="" to={registerForm}>
              <button className="button" type="submit" to={registerForm}>
                Sign Up
              </button>
            </Link>
          </Grid>
        </div>
      </Grid>
    </div>
  );
}
