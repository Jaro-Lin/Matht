import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  graded_test: [],
  currentGradedTest: {},
  error: null,
  loading: false
};

const getGradedTestListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getGradedTestListSuccess = (state, action) => {
  return updateObject(state, {
    graded_test: action.graded_test,
    error: null,
    loading: false
  });
};

const getGradedTestListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createGradedTestStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createGradedTestSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createGradedTestFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getGradedTestDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getGradedTestDetailSuccess = (state, action) => {
  return updateObject(state, {
    currentGradedTest: action.graded_test,
    error: null,
    loading: false
  });
};

const getGradedTestDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_GRADED_TEST_LIST_START:
      return getGradedTestListStart(state, action);
    case actionTypes.GET_GRADED_TEST_LIST_SUCCESS:
      return getGradedTestListSuccess(state, action);
    case actionTypes.GET_GRADED_TEST_LIST_FAIL:
      return getGradedTestListFail(state, action);
    case actionTypes.CREATE_GRADED_TEST_START:
      return createGradedTestStart(state, action);
    case actionTypes.CREATE_GRADED_TEST_SUCCESS:
      return createGradedTestSuccess(state, action);
    case actionTypes.CREATE_GRADED_TEST_FAIL:
      return createGradedTestFail(state, action);
    case actionTypes.GET_GRADED_TEST_DETAIL_START:
      return getGradedTestDetailStart(state, action);
    case actionTypes.GET_GRADED_TEST_DETAIL_SUCCESS:
      return getGradedTestDetailSuccess(state, action);
    case actionTypes.GET_GRADED_TEST_DETAIL_FAIL:
      return getGradedTestDetailFail(state, action);
    default:
      return state;
  }
};

export default reducer;
