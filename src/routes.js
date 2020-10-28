import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Profile from "./containers/Profile";
import AssignmentList from "./containers/AssignmentList";
import AssignmentDetail from "./containers/AssignmentDetail";
import AssignmentCreate from "./containers/AssignmentCreate";
import TestCreate from "./containers/TestCreate";
import TestList from "./containers/TestList";
import TestDetail from "./containers/TestDetail";
import Calendar from "./containers/Calendar";

const BaseRouter = () => (
  <Hoc>
    <Route exact path="/" component={AssignmentList} />
    <Route exact path="/testlist" component={TestList} />
    <Route exact path="/create/" component={AssignmentCreate} />
    <Route exact path="/createTest/" component={TestCreate} />
    <Route exact path="/updateTest/" component={TestCreate} />
    <Route exact path="/login/" component={Login} />
    <Route exact path="/pass/" component={Signup} />
    <Route exact path="/assignments/:id" component={AssignmentDetail} />
    <Route exact path="/calendar/" component={Calendar} />
    <Route exact path="/test/:id" component={TestDetail} />
    <Route exact path="/profile/:id" component={Profile} />
  </Hoc>
);

export default BaseRouter;
