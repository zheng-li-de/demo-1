import React, { useReducer, lazy }  from 'react';

import '../styles/App.css';

import UserContext from '../contexts/UserContext';

import Api from '../core/api.js';
import { reducer, INITIAL_STATE} from '../core/reducer.js';
import UserProfile from './UserProfile';
import LoginForm from "./LoginForm";

function App() {

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const currentValue = {
    user: state.user,
    profile: state.profile,
    hasLoginError: state.hasLoginError,
    getProfileError: state.getProfileError,
    saveProfileError: state.saveProfileError,
    dispatch: dispatch,
    login: (username, password) => {
      Api.login(username, password, function(err){
        if (err) {
          dispatch({type: "login_fail"});
        } else {
          dispatch({type: "login_success"});
        }
      });
      
    },
    logout: () => dispatch({ type: "logout" }),

    getProfile: (callback) => {
      Api.getProfile(state.user.id, function(err, profile){
        if (err) {
          dispatch({type:'get_profile_fail'});
        } else {
          dispatch({type:'get_profile_success', profile:profile});
        }
        if (callback) callback();
      });
    },

    setProfile: (callback) => {
      Api.setProfile(state.user.id, state.profile, function(err){
        if (err) {
          dispatch({type:'save_profile_fail'});
        } else {
          dispatch({type:'save_profile_success'});
        }
        if (callback) callback();
      });
    }
  };

  return (
    <UserContext.Provider value={currentValue}>
      {state.user && <UserProfile />}
      {!state.user && <LoginForm />}
    </UserContext.Provider>
  )
}

export default App;
