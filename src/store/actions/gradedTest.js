import axios from "axios";
import * as actionTypes from "./actionTypes";

const getGradedTestListStart = () => {
  return {
    type: actionTypes.GET_GRADED_TEST_LIST_START
  };
};

const getGradedTestListSuccess = test => {
  return {
    type: actionTypes.GET_GRADED_TEST_LIST_SUCCESS,
    test
  };
};

const getGradedTestListFail = error => {
  return {
    type: actionTypes.GET_GRADED_TEST_LIST_FAIL,
    error: error
  };
};

export const getGradedTest = (username, token) => {
  return dispatch => {
    dispatch(getGradedTestListStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .get(`http://127.0.0.1:8000/graded-test/?username=${username}`)
      .then(res => {
        const test = res.data;
        dispatch(getGradedTestListSuccess(test));
      })
      .catch(err => {
        dispatch(getGradedTestListFail(err));
      });
  };
};

export const createGradedTest = (token, test) => {
  return dispatch => {
    //   dispatch(createTestStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .post(`http://127.0.0.1:8000/graded-test/createTest/`, test)
      .then(res => {
        console.log("success");
        //   dispatch(createTestSuccess());
      })
      .catch(err => {
        //   dispatch(createTestFail());
      });
  };
};

export const updateGradedTest = (token, id, test) => {
  return dispatch => {
    //   dispatch(createTestStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .post(`http://127.0.0.1:8000/graded-test/updateTest/`,id, test)
      .then(res => {
        console.log("success");
        //   dispatch(createTestSuccess());
      })
      .catch(err => {
        //   dispatch(createTestFail());
      });
  };
};
