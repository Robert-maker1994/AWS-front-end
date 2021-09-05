import "./App.css";
import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routing from "./routing/routing.js";

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);


function App() {
  const ThemeContext = React.createContext();
  return (
    <div className="App">
      <Router>
      <ThemeContext.Provider >
        <Suspense fallback={<div> Loading </div>}>
          <Routing />
        </Suspense>
        </ThemeContext.Provider>
      </Router>
    </div>
  );
}

export default App;
