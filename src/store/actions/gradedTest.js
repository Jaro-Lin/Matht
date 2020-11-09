import axios from "axios";
import * as actionTypes from "./actionTypes";

const getGradedTestListStart = () => {
  return {
    type: actionTypes.GET_GRADED_TEST_LIST_START
  };
};

const getGradedTestListSuccess = graded_test => {
  return {
    type: actionTypes.GET_GRADED_TEST_LIST_SUCCESS,
    graded_test
  };
};

const getGradedTestListFail = error => {
  return {
    type: actionTypes.GET_GRADED_TEST_LIST_FAIL,
    error: error
  };
};

export const getGradedTest = token => {
  return dispatch => {
    dispatch(getGradedTestListStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .get(`http://127.0.0.1:8000/graded-test/`)
      .then(res => {
        const graded_test = res.data;
        dispatch(getGradedTestListSuccess(graded_test));
      })
      .catch(err => {
        dispatch(getGradedTestListFail());
      });
  };
};

const createGradedTestStart = () => {
  return {
    type: actionTypes.CREATE_GRADED_TEST_START
  };
};

const createGradedTestSuccess = graded_test => {
  return {
    type: actionTypes.CREATE_GRADED_TEST_SUCCESS,
    graded_test
  };
};

const createGradedTestFail = error => {
  return {
    type: actionTypes.CREATE_GRADED_TEST_FAIL,
    error: error
  };
};

export const createGradedTest = (token, test) => {
  return dispatch => {
    dispatch(createGradedTestStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .post(`http://127.0.0.1:8000/graded-test/createTest/`, test)
      .then(res => {
        console.log("success");
        dispatch(createGradedTestSuccess());
      })
      .catch(err => {
        dispatch(createGradedTestFail());
      });
  };
};

const getGradedTestDetailStart = () => {
  return {
    type: actionTypes.GET_GRADED_TEST_DETAIL_START
  };
};

const getGradedTestDetailSuccess = graded_test => {
  return {
    type: actionTypes.GET_GRADED_TEST_DETAIL_SUCCESS,
    graded_test
  };
};

const getGradedTestDetailFail = error => {
  return {
    type: actionTypes.GET_GRADED_TEST_DETAIL_FAIL,
    error: error
  };
};

export const getGradedTestDetail = (token, id) => {
  return dispatch => {
    dispatch(getGradedTestDetailStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .get(`http://127.0.0.1:8000/graded-test/?id=${id}`)
      .then(res => {
        const graded_test = res.data;
        dispatch(getGradedTestDetailSuccess(graded_test));
      })
      .catch(err => {
        dispatch(getGradedTestDetailFail());
      });
  };
};