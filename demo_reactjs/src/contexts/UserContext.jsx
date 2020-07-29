import { createContext } from 'react';

const UserContext = createContext({
  profile: null,
  hasLoginError: false,
  getProfileError: false,
  saveProfileError: false,
  login: () => null,
  logout: () => null,
  getProfile: () => null,
  setProfile: () => null,
  dispatch: () => null
});

export default UserContext;