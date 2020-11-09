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
import GradedTestList from "./containers/GradedTestList";
import GradedTestDetail from "./containers/GradedTestDetail";
import Calendar from "./containers/Calendar";
import Upload from "./containers/Upload";
import HomeworkList from "./containers/HomeworkList";
import MaterialList from "./containers/MaterialList";
import ClassList from "./containers/ClassList";
import ClassContent from "./containers/ClassContent";

const BaseRouter = () => (
  <Hoc>
    <Route exact path="/practice/" component={AssignmentList} />
    <Route exact path="/testlist/" component={TestList} />
    <Route exact path="/gradedTestlist/" component={GradedTestList} />
    <Route exact path="/create/" component={AssignmentCreate} />
    <Route exact path="/createTest/" component={TestCreate} />
    <Route exact path="/gradedTest/:id" component={GradedTestDetail} />
    <Route exact path="/login/" component={Login} />
    <Route exact path="/pass/" component={Signup} />
    <Route exact path="/practice/:id" component={AssignmentDetail} />
    <Route exact path="/calendar/" component={Calendar} />
    <Route exact path="/upload/" component={Upload} />
    <Route exact path="/homework/" component={HomeworkList} />
    <Route exact path="/material/" component={MaterialList} />
    <Route exact path="/" component={ClassList} />
    <Route exact path="/class/:id" component={ClassContent} />
    <Route exact path="/test/:id" component={TestDetail} />
    <Route exact path="/profile/:id" component={Profile} />
  </Hoc>
);

export default BaseRouter;
