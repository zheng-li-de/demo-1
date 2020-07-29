import React from 'react';
import { render, screen, fireEvent, queryByAttribute } from '@testing-library/react';

import UserContext from '../contexts/UserContext';
import UserProfile from "./UserProfile";

const getById = queryByAttribute.bind(null, 'id');

it('renders 4 input, 2 button, 1 image', () => {
    const currentValue = {
        user: {id:1},
        profile: {
            username: "admin",
            avatar: "https://example.com/example.jpg",
            description: "it is a dummy",
            link: "https://example.com/example.html",
        },
        hasLoginError: false,
        getProfile: () => {}
    };

    const tree = (
        <UserContext.Provider value={currentValue}>
            <UserProfile />
        </UserContext.Provider>
    )
    const dom = render(tree);
    const usernameInput = screen.getByLabelText('Username');
    expect(usernameInput).toBeInTheDocument();
    expect(usernameInput.value).toBe(currentValue.profile.username);
    const descInput = screen.getByLabelText('Description');
    expect(descInput).toBeInTheDocument();
    expect(descInput.value).toBe(currentValue.profile.description);
    const linkInput = screen.getByLabelText('Link');
    expect(linkInput).toBeInTheDocument();
    expect(linkInput.value).toBe(currentValue.profile.link);
    const avatarInput = screen.getByLabelText('Avatar');
    expect(avatarInput).toBeInTheDocument();
    expect(avatarInput.value).toBe(currentValue.profile.avatar);

    const img = getById(dom.container, 'avatar_img');
    if (currentValue.profile.avatar) {
        expect(img).toBeInTheDocument();
        expect(img.src).toBe(currentValue.profile.avatar);
    } 

    const saveButton = getById(dom.container, 'save');
    expect(saveButton).toBeInTheDocument();
    expect(saveButton).toHaveTextContent('Save');
    
    const logoutButton = getById(dom.container, 'logout');
    expect(logoutButton).toBeInTheDocument();
    expect(logoutButton).toHaveTextContent('Logout');

    const error = getById(dom.container, 'error');
    expect(error).toBeNull();
});

it('renders without avator', () => {
    const currentValue = {
        saveProfileError: true,
        user: {id:1},
        profile: {
            username: "admin",
            avatar: '',
            description: "it is a dummy",
            link: "https://example.com/example.html",
        },
        getProfile: () => {}
    };

    const tree = (
        <UserContext.Provider value={currentValue}>
            <UserProfile />
        </UserContext.Provider>
    )
    const dom = render(tree);
    const img = getById(dom.container, 'avatar_img');
    expect(img).toBeNull();
});

it('renders with error', () => {
    const currentValue = {
        saveProfileError: true,
        user: {id:1},
        profile: {
            username: "admin",
            avatar: "https://example.com/example.jpg",
            description: "it is a dummy",
            link: "https://example.com/example.html",
        },
        getProfile: () => {}
    };

    const tree = (
        <UserContext.Provider value={currentValue}>
            <UserProfile />
        </UserContext.Provider>
    )
    const dom = render(tree);
    const error = getById(dom.container, 'error');
    expect(error).toBeInTheDocument();
});

it('calls getProfile after rendered', () => {
    const getProfile = jest.fn();
    const currentValue = {
        user: {id:1},
        profile: {
            username: "admin",
            avatar: "https://example.com/example.jpg",
            description: "it is a dummy",
            link: "https://example.com/example.html",
        },
        getProfile: getProfile
    };

    const tree = (
        <UserContext.Provider value={currentValue}>
            <UserProfile />
        </UserContext.Provider>
    )
    render(tree);
    expect(getProfile).toHaveBeenCalledTimes(1);
});

it('calls dispatch after change the value of input', () => {
    const dispatch = jest.fn();
    const username = 'admin2';
    const avatar = '';
    const description = 'software engineer';
    const link = 'https://www.google.com';

    const currentValue = {
        user: {id:1},
        profile: {
            username: "admin",
            avatar: "https://example.com/example.jpg",
            description: "it is a dummy",
            link: "https://example.com/example.html",
        },
        getProfile: () => {},
        dispatch: dispatch
    };

    const tree = (
        <UserContext.Provider value={currentValue}>
            <UserProfile />
        </UserContext.Provider>
    )
    render(tree);
    const usernameInput = screen.getByLabelText('Username');
    expect(usernameInput.value).toBe(currentValue.profile.username); 
    fireEvent.change(usernameInput, { target: { value: username } });
    expect(dispatch).toHaveBeenCalledWith({type:'set_profile_username', username:username});

    const descInput = screen.getByLabelText('Description');
    expect(descInput.value).toBe(currentValue.profile.description); 
    fireEvent.change(descInput, { target: { value: description } });
    expect(dispatch).toHaveBeenCalledWith({type:'set_profile_description', description:description});

    const linkInput = screen.getByLabelText('Link');
    expect(linkInput.value).toBe(currentValue.profile.link); 
    fireEvent.change(linkInput, { target: { value: link } });
    expect(dispatch).toHaveBeenCalledWith({type:'set_profile_link', link:link});

    const avatarInput = screen.getByLabelText('Avatar');
    expect(avatarInput.value).toBe(currentValue.profile.avatar); 
    fireEvent.change(avatarInput, { target: { value: avatar } });
    expect(dispatch).toHaveBeenCalledWith({type:'set_profile_avatar', avatar:avatar});
});

it('calls setProfile after click the save button', () => {
    const setProfile = jest.fn(cb => cb());
    const currentValue = {
        user: {id:1},
        profile: {
            username: "admin",
            avatar: "https://example.com/example.jpg",
            description: "it is a dummy",
            link: "https://example.com/example.html",
        },
        getProfile: () => {},
        setProfile: setProfile
    };

    const tree = (
        <UserContext.Provider value={currentValue}>
            <UserProfile />
        </UserContext.Provider>
    )
    const dom = render(tree);
    const button = getById(dom.container, 'save');
    fireEvent.click(button, { target: {} });
    expect(setProfile).toHaveBeenCalledTimes(1);
});