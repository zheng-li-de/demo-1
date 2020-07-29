import React, { useState, useEffect, useContext } from "react";
import "../styles/App.css";
import UserContext from "../contexts/UserContext";

const UserProfile = () => {

  const { user, profile, saveProfileError, getProfile, setProfile, logout, dispatch } = useContext(UserContext);

  const [saving, setSaving] = useState(false);

 
  useEffect(() => {
    getProfile();
  }, [user.id]);

  const onChange = (event) => {
    const target = event.target;
    dispatch({type:"set_profile_"+target.name, [target.name]:target.value});
  };

  const onSave = () => {
    setSaving(true);
    setProfile(function(){
      setSaving(false);
    });
  };

  return (
    <div className="login-form">
      <h1>User Profile</h1>
      {saveProfileError && (
        <div id="error" className="login-form-error">
          Save Failed
        </div>
      )}
      <fieldset>
        <legend>Profile</legend>
        <label>
          <span>Username</span>
          <input
            name="username"
            type="text"
            value={profile.username}
            onChange={onChange}
            placeholder="username"
            required
          />
        </label>
        <label>
          <span>Description</span>
          <textarea
            name="description"
            type="text"
            value={profile.description}
            onChange={onChange}
          />
        </label>
        <label>
          <span>Link</span>
          <input
            name="link"
            type="text"
            value={profile.link}
            onChange={onChange}
          />
        </label>
        <label>
          <span>Avatar</span>
          <input
            name="avatar"
            type="text"
            value={profile.avatar}
            onChange={onChange}
          />
        </label>
        {profile.avatar && (
        <img id="avatar_img" src={profile.avatar || ''} width="100" height="100" alt=""/>
        )}   
      </fieldset>
      <button id="save" onClick={onSave} disabled={saving}>Save</button>
      <br/>
      <button id="logout" onClick={logout} >Logout</button>
    </div>
  );
};

export default UserProfile;