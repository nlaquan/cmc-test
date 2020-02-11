import React, { useState, useEffect, useContext } from 'react';
import { login } from '../api/common';
import { withRouter } from "react-router";
import { FailAlert } from '../components/alert';
import { StateContext } from '../App';

const UIAuthState = {
  LOADING: 'LOADING',
  WAIT: 'WAIT'
};

const INIT_STATE = {
  username: '',
  password: '',
  status: UIAuthState.WAIT,
  errorMessage: ''
};

function Login({ history }) {
  const [state, setState] = useContext(StateContext);
  const [loginState, setLoginState] = useState(INIT_STATE);

  const { username, password } = loginState;

  const onChange = (event) => {
    const { name, value } = event.target;
    setLoginState(state => ({ ...state, [name]: value }));
  }

  const onClick = () => {
    setLoginState(state => ({
      ...state,
      status: UIAuthState.WAIT,
      errorMessage: ''
    }))
  }

  const onSubmit = (event) => {
    event.preventDefault();
    if (username && password) {
      setLoginState(state => ({
        ...state,
        status: UIAuthState.LOADING,
        errorMessage: '',
      }));

      login({ username, password })
        .then(res => setState({ ...state, user: { ...res, username } }))
        .catch(() => setLoginState({
          ...loginState,
          status: UIAuthState.WAIT,
          errorMessage: 'Failed to login. Please check your username, password, then try again.'
        }));
    } else {
      setLoginState(state => ({
        ...state,
        status: UIAuthState.WAIT,
        errorMessage: 'Please fill out all the information above.'
      }))
    }
  }

  useEffect(() => {
    if (state.user) {
      setTimeout(() => history.push('/'), 2000);
    }
  }, [history, state.user]);

  return (
    <div className="container mx-auto">
      {
        loginState.errorMessage
        && <FailAlert
          header={"Holy smoke!!!"}
          message={loginState.errorMessage}
          onClick={onClick}
        />
      }
      {
        state.user
          ? <p>You have logged in. You will be redirected to Home page in few seconds</p>
          : (
            <div className="w-full mx-auto max-w-xs mt-8">
              <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={onSubmit}
              >
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Username
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Sign In
                  </button>
                  <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                    href="#"
                  >
                    Forgot Password?
                  </a>
                </div>
              </form>
              <p className="text-center text-gray-500 text-xs">
                &copy;2020 CMC Corp. All rights reserved.
              </p>
            </div>
          )
      }
      {
        loginState.status === UIAuthState.LOADING ? (
          <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
            <span className="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0 pt-40">
              <i className="fas fa-circle-notch fa-spin fa-2x"/>
            </span>
          </div>
        )
          : null
      }
    </div>
  );
}

export default withRouter(Login);
