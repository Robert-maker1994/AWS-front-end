import "./App.css";
import React, { Suspense, useMemo, useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routing from "./routing/routing.js";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import UserContext from "./context/UserContext";
Amplify.configure(awsconfig);

function App() {
  const [user, setUser] = useState(null);
  //Memuzi the user The user isn't chaged that much. 
  const providerValue = useMemo(() => ({user, setUser}), user, setUser );
  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={providerValue}>
          <Suspense fallback={<div> Loading </div>}>
            <Routing />
          </Suspense>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
