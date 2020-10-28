import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  test: [],
  currentTest: {},
  error: null,
  loading: false
};

const getTestListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getTestListSuccess = (state, action) => {
  return updateObject(state, {
    test: action.test,
    error: null,
    loading: false
  });
};

const getTestListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getTestDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getTestDetailSuccess = (state, action) => {
  return updateObject(state, {
    currentTest: action.test,
    error: null,
    loading: false
  });
};

const getTestDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createTestStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createTestSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createTestFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TEST_LIST_START:
      return getTestListStart(state, action);
    case actionTypes.GET_TEST_LIST_SUCCESS:
      return getTestListSuccess(state, action);
    case actionTypes.GET_TEST_LIST_FAIL:
      return getTestListFail(state, action);
    case actionTypes.GET_TEST_DETAIL_START:
      return getTestDetailStart(state, action);
    case actionTypes.GET_TEST_DETAIL_SUCCESS:
      return getTestDetailSuccess(state, action);
    case actionTypes.GET_TEST_DETAIL_FAIL:
      return getTestDetailFail(state, action);
    case actionTypes.CREATE_TEST_START:
      return createTestStart(state, action);
    case actionTypes.CREATE_TEST_SUCCESS:
      return createTestSuccess(state, action);
    case actionTypes.CREATE_TEST_FAIL:
      return createTestFail(state, action);
    default:
      return state;
  }
};

export default reducer;
