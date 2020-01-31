import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/jokes" component={Joke}/>
      </Switch>
    </div>
  );
}

export default App;
