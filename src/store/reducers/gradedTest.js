import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  test: [],
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
    test: action.test,
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

const updateGradedTestListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const updateGradedTestListSuccess = (state, action) => {
  return updateObject(state, {
    test: action.test,
    error: null,
    loading: false
  });
};

const updateGradedTestListFail = (state, action) => {
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
    case actionTypes.UPDATE_GRADED_TEST_LIST_START:
      return updateGradedTestListStart(state, action);
    case actionTypes.UPDATE_GRADED_TEST_LIST_SUCCESS:
      return updateGradedTestListSuccess(state, action);
    case actionTypes.UPDATE_GRADED_TEST_LIST_FAIL:
      return updateGradedTestListFail(state, action);
    default:
      return state;
  }
};

export default reducer;
