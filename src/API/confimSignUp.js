import React from 'react'
import { Auth } from 'aws-amplify';

async function confimSignUp({username, code}) {
    try {
        // await Auth.confirmSignUp(username, code);
        console.log(username, "This is the code => ", code)
      } catch (error) {
          console.log('error confirming sign up', error);
      }
  }

export default confimSignUp
