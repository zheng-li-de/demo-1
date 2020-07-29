package com.hoval.example.demo;

import java.util.Optional;

import com.hoval.example.demo.dao.IProfileDAO;
import com.hoval.example.demo.data.Profile;
import com.hoval.example.demo.service.IProfileService;
import com.hoval.example.demo.service.ProfileServiceException;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import org.mockito.Mockito;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class ProfileServiceUnitTests {
    
    @Autowired
    private IProfileService profileService;

    @MockBean
    private IProfileDAO profileDAO;

    @Test
    public void test_getProfile_success() {
        Profile expected = new Profile();
        expected.setId(1);
        expected.setUsername("zl");
        expected.setAvatar("https://ibm.com");
        expected.setDescription("software engineer");

        Optional<Profile> result = Optional.of(expected);
        Mockito.when(profileDAO.findById(expected.getId()))
                .thenReturn(result);

        Profile actual = profileService.getProfile(expected.getId());
        verify(profileDAO, times(1)).findById(expected.getId());
        assertEquals(expected.getId(), actual.getId());
        assertEquals(expected.getUsername(), actual.getUsername());
        assertEquals(expected.getDescription(), actual.getDescription());
        assertEquals(expected.getAvatar(), actual.getAvatar());
        assertEquals(expected.getLink(), actual.getLink());
    }

    @Test
    public void test_getProfile_fail() {
        Profile expected = new Profile();
        expected.setId(1);

        Optional<Profile> result = Optional.empty();
        Mockito.when(profileDAO.findById(expected.getId()))
                .thenReturn(result);

        ProfileServiceException actual = assertThrows(ProfileServiceException.class, () -> {
            profileService.getProfile(expected.getId());
        });

        verify(profileDAO, times(1)).findById(expected.getId());
        assertNotNull(actual);
        assertEquals(ProfileServiceException.PROFILE_NOT_EXIST, actual.getCode());
    }

    @Test
    public void test_saveProfile_success() {
        Profile expected = new Profile();
        expected.setId(1);
        expected.setUsername("zl");
        expected.setAvatar("https://ibm.com");
        expected.setDescription("software engineer");

        Mockito.when(profileDAO.save(expected))
                .thenReturn(expected);

        Profile actual = profileService.saveProfile(expected.getId(), expected);
        verify(profileDAO, times(1)).save(expected);
        assertEquals(expected.getId(), actual.getId());
        assertEquals(expected.getUsername(), actual.getUsername());
        assertEquals(expected.getDescription(), actual.getDescription());
        assertEquals(expected.getAvatar(), actual.getAvatar());
        assertEquals(expected.getLink(), actual.getLink());
    }

    @Test
    public void test_saveProfile_faile() {
        Profile expected = new Profile();
        expected.setId(1);
        expected.setUsername("username_length_larger_than_16");
        expected.setAvatar("https://ibm.com");
        expected.setDescription("software engineer");

        Mockito.when(profileDAO.save(expected))
                .thenReturn(expected);

        ProfileServiceException actual = assertThrows(ProfileServiceException.class, () -> {
            profileService.saveProfile(expected.getId(), expected);
        });

        verify(profileDAO, times(0)).save(expected);
        assertNotNull(actual);
        assertEquals(ProfileServiceException.INVALID_USERNAME, actual.getCode());
    }
}