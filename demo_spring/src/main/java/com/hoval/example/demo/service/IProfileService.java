package com.hoval.example.demo.service;

import com.hoval.example.demo.data.Profile;

public interface IProfileService {
    public Profile saveProfile(long id, Profile profile) throws ProfileServiceException;
    public Profile getProfile(long id) throws ProfileServiceException;
}