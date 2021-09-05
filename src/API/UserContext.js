import React, { createContext, useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";
import Loader from '../components/Loading.js'


export const Context = createContext({});


export  function UserContext(email,  password) {
  //Setting states
  const [data, setdata] = useState();
  const [init] = useState({
    body: { _id: 4, email, password }, // replace this with attributes you need
    headers: {}, // OPTIONAL
  });
  const [isLoaded, setisLoaded] = useState(false);

  useEffect( () => {
    const data =  Auth.signIn(email, password).then(res => console.log(res.Authorization)).catch(eer => console.log(eer))
        API.post("chefapi", "/user", init)
         .then()
         .catch((err) => console.log(err));
 
        }, []);
        return [data]
}


