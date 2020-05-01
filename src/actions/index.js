import streams from "../apis/streams";
import * as actionType from "./types";
import history from "../history";

export const signIn = (userId) => {
  return {
    type: actionType.SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: actionType.SIGN_OUT,
  };
};

export const createStream = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post("/streams", { ...formValues, userId });
  dispatch({ type: actionType.CREATE_STREAM, payload: response.data });

  // Navigate to root
  history.push("/");
};

export const fetchStreams = () => async (dispatch) => {
  const response = await streams.get("/streams");
  dispatch({ type: actionType.FETCH_STREAMS, payload: response.data });
};

export const fetchStream = (id) => async (dispatch) => {
  const response = await streams.get(`/streams/${id}`);
  dispatch({ type: actionType.FETCH_STREAM, payload: response.data });
};

export const editStream = (id, formValues) => async (dispatch) => {
  const response = await streams.patch(`/streams/${id}`, formValues);
  dispatch({ type: actionType.EDIT_STREAM, payload: response.data });

  // Navigate to root
  history.push("/");
};

export const deleteStream = (id) => async (dispatch) => {
  await streams.delete(`/streams/${id}`);
  dispatch({ type: actionType.DELETE_STREAM, payload: id });

  // Navigate to root
  history.push("/");
};
