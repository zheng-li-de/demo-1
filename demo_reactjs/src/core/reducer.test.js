import {reducer, INITIAL_STATE, INITIAL_PROFILE } from './reducer';

const state = {
    user: {id:5},
    profile: {
        username: "random",
        avatar: "hohoho",
        description: "nonono",
        link: null,
    },
    hasLoginError: false,
    getProfileError: false,
    saveProfileError: false
};

const newprofile = {
    username: "zl",
    avatar: "tttttt",
    description: "11111",
    link: "2123141231",
};

describe('test action type', () => {

    it('login_success action', () => {
        var actual = reducer(state, {type:'login_success'});
        var expected = {...state, hasLoginError: false, user: {id:1}, profile:INITIAL_PROFILE};
        expect(actual).toStrictEqual(expected);
    });

    it('login_fail action', () => {
        var actual = reducer(state, {type:'login_fail'});
        var expected = {...state, hasLoginError: true, user: null, profile:INITIAL_PROFILE};
        expect(actual).toStrictEqual(expected);
    });

    it('logout action', () => {
        var actual = reducer(state, {type:'logout'});
        var expected = {...state, user: null, profile:INITIAL_PROFILE};
        expect(actual).toStrictEqual(expected);
    });

    it('get_profile_success action', () => {
        var actual = reducer(state, {type:'get_profile_success', profile:newprofile});
        var expected = {...state, getProfileError: false, profile: newprofile};
        expect(actual).toStrictEqual(expected);
    });
});