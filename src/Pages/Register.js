import React, { Fragment, useState } from "react";
import { Grid, TextField, IconButton, InputAdornment } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { login } from "../routing/routing";
import { API, Auth } from "aws-amplify";

import "./login.scss";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import SigninDialog from "../components/SigninDialog";
import Loading from "../components/Loading";

const Register = () => {
  const [open, setOpen] = React.useState(true);

  const [showPassword, setShowPassword] = useState(false);

  const [username, setusername] = useState();
  const [attributes, setattributes] = useState({ email: "" });
  // const [email, setEmail] = useState();
  const [Unsuccessful, setUnsuccessfulr] = useState(true);

  const [password, setPassword] = useState();
  let history = useHistory();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const onsubmit = async () => {
    try {
      /*  Adding the user to the cognito pool */
      const { user } = await Auth.signUp({
        username,
        password,
        attributes,
      });
      console.log(user);
      //  Adding the data to dynamodb
      setOpen(true);
      setUnsuccessfulr(false);
    } catch (error) {
      console.log("error signing up:", error);
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    console.log(open);
  };

  return (
    <div className="background">
      <Grid className="container">
        <div className="form-container">
          <h1>Register</h1>
          <Grid className="margin">
            <TextField
              label="Name"
              variant="outlined"
              onChange={(e) => setusername(e.target.value)}
            />
          </Grid>
          <Grid className="margin">
            <TextField
              label="Email"
              variant="outlined"
              onChange={(e) => {
                setattributes({ email: e.target.value });
              }}
            />
          </Grid>
          <Grid className="margin">
            <TextField
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {/*Icon button */}
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid>
            <button
              className="button"
              type="submit"
              size={"medium"}
              onClick={onsubmit}
            >
              Register
            </button>

            <Link to={login}>
              <button className="button"> Already Signed up</button>
            </Link>

            {!Unsuccessful ? (
              <SigninDialog
                history={history}
                username={username}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                open={open}
              />
            ) : null}
          </Grid>
        </div>
      </Grid>
    </div>
  );
};

export default Register;
