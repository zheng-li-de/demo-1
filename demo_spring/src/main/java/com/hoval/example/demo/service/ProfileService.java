package com.hoval.example.demo.service;

import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import com.hoval.example.demo.dao.IProfileDAO;
import com.hoval.example.demo.data.Profile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional(readOnly = true)
public class ProfileService implements IProfileService {

    @Autowired
    private IProfileDAO profileDAO;

    @Override
    @Transactional(readOnly = false, rollbackFor=Exception.class)
    public Profile saveProfile(long id, Profile newProfile) throws ProfileServiceException {
        String username = newProfile.getUsername();
        if (username == null || username.length() == 0 || username.length() > 16) {
            throw new ProfileServiceException(ProfileServiceException.INVALID_USERNAME,"invalid username parameter");
        }
        newProfile.setId(id);
        return profileDAO.save(newProfile);
    }

    @Override
    public Profile getProfile(long id) throws ProfileServiceException {
        //Profile user = profileDAO.getProfileById(id);
        Optional<Profile> user = profileDAO.findById(id);
        if (user == null || user.isEmpty()) {
            throw new ProfileServiceException(ProfileServiceException.PROFILE_NOT_EXIST, "no such profile");
        }
        return user.get();
    }
    
}