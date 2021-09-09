import React from "react";

import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  CircularProgress,
  Backdrop,
  DialogTitle,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

import { Auth } from "aws-amplify";
import Loading from "./Loading";

const useStyles = makeStyles((theme) => ({
  // backdrop: {
  //   zIndex: theme.zIndex.drawer + 1,
  //   color: "#fff",
  // },
}));
export default function SigninDialog({ history, handleClose, username, open }) {
  const classes = useStyles();
  const [code, setCode] = React.useState();
  const [loading, setLoading] = React.useState(false);
  async function resendConfirmationCode() {
    try {
      
      // Auth the user via email
     const data =  await Auth.confirmSignUp(username, code);
     console.log(data)
      //Laoding img for affect
      setLoading(true);
      
      setTimeout(() => {
        history.push("/");
      }, 1000);
    } catch (error) {
      console.log("error confirming sign up", error);
    }
  }
  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {!loading ? (
          <>
            <DialogTitle id="alert-dialog-title">
              {"Please check your emails to see the code we have send you?"}
            </DialogTitle>
            <DialogActions>
              <TextField
                label="code"
                variant="outlined"
                onChange={(e) => setCode(e.target.value)}
              />
              <Button
                onClick={resendConfirmationCode}
                color="primary"
                autoFocus
              >
                Enter
              </Button>
            </DialogActions>
          </>
        ) : (
          <Backdrop
            className={classes.backdrop}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </Dialog>
    </div>
  );
}
