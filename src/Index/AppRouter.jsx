import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from './App';
import Detail from '../Detail/Detail';
function AppRouter() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/detail" component={Detail} />
      </div>
    </Router>
  );
}

export default AppRouter;