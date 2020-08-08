import React from "react";
import "antd/dist/antd.css";
import { AppForm } from "./App.style.js";
import Menu from "./components/Menu";
import PatchList from "./pages/PatchList";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Home from "./pages/Home.js";
import PatchNote from "./pages/PatchNote.js";

function App() {
  return (
    <AppForm>
      <div className="headerForm">
        <Menu />
      </div>
      <main>
        <div className="login">
          <Login />
        </div>
        <div className="mainContent">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/:name" component={PatchList} />
            <Route path="/:name/:id" component={PatchNote} />
          </Switch>
        </div>
      </main>
    </AppForm>
  );
}

export default App;
