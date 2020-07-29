const INITIAL_PROFILE = {
    username: "",
    avatar: "",
    description: "",
    link: "",
};
  
const INITIAL_STATE = {
    user: null,
    profile: INITIAL_PROFILE,
    hasLoginError: false,
    getProfileError: false,
    saveProfileError: false
};

//TODO: use redux to do state management
const reducer = (state, action) => {
    switch (action.type) {
      case "login_success": 
        return {...state, hasLoginError: false, user: {id: 1}, profile: INITIAL_PROFILE};
      case "login_fail": 
        return {...state, hasLoginError: true, user: null, profile: INITIAL_PROFILE};
      case "logout":
        return {...state, user: null, profile: INITIAL_PROFILE};
      case "get_profile_success":
        return {...state, getProfileError: false, profile: action.profile};
      case "get_profile_fail":
        return {...state, getProfileError: true, profile: INITIAL_PROFILE};
      case "save_profile_success":
        return {...state, saveProfileError: false};
      case "save_profile_fail":
        return {...state, saveProfileError: true};
      case 'set_profile_username':
        return {...state, profile:{...state.profile, username:action.username}};
      case 'set_profile_avatar':
        return {...state, profile:{...state.profile, avatar:action.avatar}};
      case 'set_profile_description':
        return {...state, profile:{...state.profile, description:action.description}};
      case 'set_profile_link':
        return {...state, profile:{...state.profile, link:action.link}};
      default:
        throw new Error(`Invalid action type: ${action.type}`);
    }
};

export {reducer, INITIAL_STATE, INITIAL_PROFILE};
  