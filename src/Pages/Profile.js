import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import UserContext from "../context/UserContext";
import PersistentDrawer from "../Nav/Drawer";
import { login } from "../routing/routing";

function Profile() {
  //Pass the User context.
  const { user, setUser } = useContext(UserContext);
  let history = useHistory();
  console.log(user)
  return (
    <div>
      {user === null ? (
        history.push(login)
      ) : (
        <div>
        <PersistentDrawer />
          <h1>profile</h1>
        </div>
      )}
    </div>
  );
}

export default Profile;
