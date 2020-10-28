import axios from "axios";
import * as actionTypes from "./actionTypes";

const getTestListStart = () => {
  return {
    type: actionTypes.GET_TEST_LIST_START
  };
};

const getTestListSuccess = test => {
  return {
    type: actionTypes.GET_TEST_LIST_SUCCESS,
    test
  };
};

const getTestListFail = error => {
  return {
    type: actionTypes.GET_TEST_LIST_FAIL,
    error: error
  };
};

export const getTest = token => {
  return dispatch => {
    dispatch(getTestListStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .get("http://127.0.0.1:8000/test/")
      .then(res => {
        const test = res.data;
        dispatch(getTestListSuccess(test));
      })
      .catch(err => {
        dispatch(getTestListFail());
      });
  };
};

const getTestDetailStart = () => {
  return {
    type: actionTypes.GET_TEST_DETAIL_START
  };
};

const getTestDetailSuccess = test => {
  return {
    type: actionTypes.GET_TEST_DETAIL_SUCCESS,
    test
  };
};

const getTestDetailFail = error => {
  return {
    type: actionTypes.GET_TEST_DETAIL_FAIL,
    error: error
  };
};

export const getTestDetail = (token, id) => {
  return dispatch => {
    dispatch(getTestDetailStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .get(`http://127.0.0.1:8000/test/${id}/`)
      .then(res => {
        const test = res.data;
        dispatch(getTestDetailSuccess(test));
      })
      .catch(err => {
        dispatch(getTestDetailFail());
      });
  };
};

const createTestStart = () => {
  return {
    type: actionTypes.CREATE_TEST_START
  };
};

const createTestSuccess = test => {
  return {
    type: actionTypes.CREATE_TEST_SUCCESS,
    test
  };
};

const createTestFail = error => {
  return {
    type: actionTypes.CREATE_TEST_FAIL,
    error: error
  };
};

export const createTest = (token, test) => {
  return dispatch => {
    dispatch(createTestStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .post(`http://127.0.0.1:8000/test/`, test)
      .then(res => {
        dispatch(createTestSuccess());
      })
      .catch(err => {
        dispatch(createTestFail());
      });
  };
};
