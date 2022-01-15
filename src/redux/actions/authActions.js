import API from "../../api";
import * as actionTypes from "./actionTypes";

export function authSuccess(user) {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: user,
  };
}
export function authError(error) {
  return {
    type: actionTypes.AUTH_ERROR,
    payload: error,
  };
}
export function logIn(req) {
  return async function (dispatch) {
    var res = await API.AuthApi.loginPost(req);
    console.log(res.data)

    if (res.data.success) {
     
      window.localStorage.setItem("mezura:token", res.data.data.token);
      dispatch(authSuccess(res.data.data.user));
      dispatch(authError(null));
    }
    else{
      dispatch(authError(res.data.error));
      
    }
  };
} 
