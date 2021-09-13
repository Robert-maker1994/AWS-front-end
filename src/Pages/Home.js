/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useContext, useState } from "react";
import { useHistory } from "react-router";
import UserContext from "../context/UserContext";
import { login } from "../routing/routing";
import { API } from "aws-amplify";
import PersistentDrawer from "../Nav/Drawer";
import CreateDish from "../components/CreateDish/CreateDish";

function Home() {
  const { user, setUser } = useContext(UserContext);
  const [response, setresponse] = useState([])
  let history = useHistory();
  //to call the API 
  //Access the data from DynimoDB 
  //safe it to state. 
 console.log(user)
  return (
    <div>
      {/* {user === null ? (
        history.push(login)
      ) : ( */}
        <div>
        <PersistentDrawer />
          <h1>Home</h1>
            <CreateDish />
        </div>
      {/* )} */}
    </div>
  );
}

export default Home;
