import React from 'react';
import { render, screen, fireEvent, queryByAttribute } from '@testing-library/react';

import UserContext from '../contexts/UserContext';
import LoginForm from "./LoginForm";

const getById = queryByAttribute.bind(null, 'id');

it('renders 2 input, 1 button, no error', () => {
    const currentValue = {
        hasLoginError: false
    };

    const tree = (
        <UserContext.Provider value={currentValue}>
            <LoginForm />
        </UserContext.Provider>
    )
    render(tree);
    const usernameInput = screen.getByLabelText('Username');
    expect(usernameInput).toBeInTheDocument();
    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput).toBeInTheDocument();
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Login');
    const error = screen.queryByText("Failed");
    expect(error).toBeNull();
});

it('renders with error', () => {
    const currentValue = {
        hasLoginError: true
    };

    const tree = (
        <UserContext.Provider value={currentValue}>
            <LoginForm />
        </UserContext.Provider>
    )
    const dom = render(tree);
    const error = getById(dom.container, 'error');
    expect(error).toBeInTheDocument();
});

it('call login function with click button', () => {
    const login = jest.fn();
    const username = 'admin';
    const password = 'admin';
    const currentValue = {
        login: login,
        hasLoginError: false
    };

    const tree = (
        <UserContext.Provider value={currentValue}>
            <LoginForm />
        </UserContext.Provider>
    )
    let view = render(tree);
    const usernameInput = screen.getByLabelText('Username');
    expect(usernameInput.value).toBe('') 
    fireEvent.change(usernameInput, { target: { value: username } })
    expect(usernameInput.value).toBe(username)

    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput.value).toBe('') 
    fireEvent.change(passwordInput, { target: { value: password } })
    expect(passwordInput.value).toBe(password)


    const button = screen.getByRole('button');
    fireEvent.submit(button, { target: {} })
    expect(login).toHaveBeenCalledTimes(1);
    expect(login).toHaveBeenCalledWith(username, password);
});
