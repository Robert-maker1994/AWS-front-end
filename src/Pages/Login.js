import React, { useState, createContext } from "react";
import { IconButton, InputAdornment, Grid, TextField } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { profile, registerForm } from "../routing/routing";
import { API, Auth } from "aws-amplify";
import "./login.scss";
import { Visibility, VisibilityOff } from "@material-ui/icons";


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setusername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
const [state, setstate] = useState()
  const [unsuccessful, setUnsuccessful] = useState(true);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  let history = useHistory();

  const SubmitLogin = async () => {
    try {
      const email = username;
      // Auth
      const init = {
        body: { _id: 4, email, username }, // replace this with attributes you need
        headers: {}, // OPTIONAL
      };
      const user = await Auth.signIn(email, password);
      await API.post("chefapi", "/user", init)
        .then((res) => res)
        .catch((err) => console.log(err));
       // setTimeout(() => {
          // localStorage.setItem("user", user.CognitoUser);
          // history.push(profile);
     setstate(user)
    //    }, 2000);
    } catch (error) {
      if (error) {
        setUnsuccessful(false)
      }
      console.log("error signing in", error.message);
    }
  };

  return (
    <Grid className="container">
      <div className="form-container">
        <h1>Please Login</h1>
        <div className="margin">
          <TextField
            label="Email"
            variant="outlined"
            onChange={(e) => {
              setusername(e.target.value);
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
          <button type="submit" onClick={SubmitLogin}>
            {" "}
            Login{" "}
          </button>
          <Link className="" to={registerForm}>
            <button className="" type="submit" to={registerForm}>
              Sign Up
            </button>
          </Link>
        </Grid>
      </div>
    </Grid>
  );
};