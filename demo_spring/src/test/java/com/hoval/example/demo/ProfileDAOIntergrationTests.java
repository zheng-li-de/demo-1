package com.hoval.example.demo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.Optional;

import com.hoval.example.demo.dao.IProfileDAO;
import com.hoval.example.demo.data.Profile;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@DataJpaTest
public class ProfileDAOIntergrationTests {
    
    @Autowired
    private TestEntityManager entityManager;
 
    @Autowired
    private IProfileDAO profileDAO;
 
    @Test
    public void test_getProfileById() {
        // given
        Profile expected = new Profile();
        expected.setId(100);
        expected.setUsername("test_profile");
        expected.setAvatar("https://google.com");
        expected.setDescription("demo user");
        expected = entityManager.persistAndFlush(expected);
    
        // when
        //Profile actual = profileDAO.getProfileById(expected.getId());
        Optional<Profile> result = profileDAO.findById(expected.getId());
    
        assertNotNull(result);
        assertFalse(result.isEmpty());
        Profile actual = result.get();
        // then
        assertEquals(expected.getId(), actual.getId());
        assertEquals(expected.getUsername(), actual.getUsername());
        assertEquals(expected.getDescription(), actual.getDescription());
        assertEquals(expected.getAvatar(), actual.getAvatar());
        assertEquals(expected.getLink(), actual.getLink());
    }

    @Test
    public void test_saveProfile() {
        // given
        Profile expected = new Profile();
        expected.setId(5);
        expected.setUsername("test_profile");
        expected.setAvatar("https://google.com");
        expected.setDescription("demo user");

        // when
        //profileDAO.saveProfile(expected);
        profileDAO.save(expected);
        Profile actual = entityManager.find(Profile.class, expected.getId());
        // then
        assertEquals(expected.getId(), actual.getId());
        assertEquals(expected.getUsername(), actual.getUsername());
        assertEquals(expected.getDescription(), actual.getDescription());
        assertEquals(expected.getAvatar(), actual.getAvatar());
        assertEquals(expected.getLink(), actual.getLink());
    }
}