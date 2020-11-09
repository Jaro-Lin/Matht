import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import authReducer from "./store/reducers/auth";
import assignmentReducer from "./store/reducers/assignments";
import gradedAssignmentReducer from "./store/reducers/gradedAssignments";
import testReducer from "./store/reducers/test";
import gradedTestReducer from "./store/reducers/gradedTest";
import uploadReducer from "./store/reducers/upload";
import classReducer from "./store/reducers/class";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  assignments: assignmentReducer,
  gradedAssignments: gradedAssignmentReducer,
  test: testReducer,
  gradedTest: gradedTestReducer,
  upload: uploadReducer,
  class: classReducer,
});

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
