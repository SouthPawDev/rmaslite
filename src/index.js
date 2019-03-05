import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Home from "./Home";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route } from "react-router-dom";

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/home" component={Home} />
      <Route exact path="/" component={Home} />
      <Route exact path="/upload" component={App} />
      <Route exact path="/MEM/MEM_SVR_IBLIST" component={App} />
      <Route exact path="/MEM/MEM_SVR_OBLIST" component={App} />
      <Route exact path="/MEM/MEM_SVR_SDLIST/INLET" component={App} />
      <Route exact path="/MEM/MEM_SVR_SDLIST/DEICE" component={App} />
      <Route exact path="/CDG/CDG_SVR_IBLIST" component={App} />
      <Route exact path="/CDG/CDG_SVR_OBLIST" component={App} />
      <Route exact path="/CDG/CDG_SVR_SDLIST/INLET" component={App} />
      <Route exact path="/CDG/CDG_SVR_SDLIST/DEICE" component={App} />
      <Route exact path="/CAN/CAN_SVR_IBLIST" component={App} />
      <Route exact path="/CAN/CAN_SVR_OBLIST" component={App} />
      <Route exact path="/CAN/CAN_SVR_SDLIST/INLET" component={App} />
      <Route exact path="/CAN/CAN_SVR_SDLIST/DEICE" component={App} />
      <Route exact path="/AFW/AFW_SVR_IBLIST" component={App} />
      <Route exact path="/AFW/AFW_SVR_OBLIST" component={App} />
      <Route exact path="/AFW/AFW_SVR_SDLIST/INLET" component={App} />
      <Route exact path="/AFW/AFW_SVR_SDLIST/DEICE" component={App} />
      <Route exact path="/IND/IND_SVR_IBLIST" component={App} />
      <Route exact path="/IND/IND_SVR_OBLIST" component={App} />
      <Route exact path="/IND/IND_SVR_SDLIST/INLET" component={App} />
      <Route exact path="/IND/IND_SVR_SDLIST/DEICE" component={App} />
      <Route exact path="/EWR/EWR_SVR_IBLIST" component={App} />
      <Route exact path="/EWR/EWR_SVR_OBLIST" component={App} />
      <Route exact path="/EWR/EWR_SVR_SDLIST/INLET" component={App} />
      <Route exact path="/EWR/EWR_SVR_SDLIST/DEICE" component={App} />
      <Route exact path="/GSO/GSO_SVR_IBLIST" component={App} />
      <Route exact path="/GSO/GSO_SVR_OBLIST" component={App} />
      <Route exact path="/GSO/GSO_SVR_SDLIST/INLET" component={App} />
      <Route exact path="/GSO/GSO_SVR_SDLIST/DEICE" component={App} />
      <Route exact path="/OAK/OAK_SVR_IBLIST" component={App} />
      <Route exact path="/OAK/OAK_SVR_OBLIST" component={App} />
      <Route exact path="/OAK/OAK_SVR_SDLIST/INLET" component={App} />
      <Route exact path="/OAK/OAK_SVR_SDLIST/DEICE" component={App} />
    </div>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
