import React from "react";
import styles from "./App.module.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { HomePage } from "./pages";

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/signIn" render={() => <h2>登录页面</h2>} />
          <Route render={() => <h2>404 页面不存在</h2>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
