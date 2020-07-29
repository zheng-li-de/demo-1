package com.hoval.example.demo;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hoval.example.demo.data.Profile;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
public class ApiIntergrationTest {
    
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    
    @Test
    public void test_getProfile_success() throws Exception {
        Profile expected = new Profile();
        expected.setId(1);
        expected.setUsername("zl");
        expected.setAvatar("https://ibm.com");
        expected.setDescription("software engineer");

        MockHttpServletRequestBuilder request = MockMvcRequestBuilders.get("/api/v1/profile/1");
        ResultActions perform = mockMvc.perform(request);
        perform.andExpect(MockMvcResultMatchers.status().isOk());
        
        MvcResult mvcResult = perform.andReturn();
        MockHttpServletResponse response = mvcResult.getResponse();

        String text = response.getContentAsString();
        Profile actual = objectMapper.readValue(text, Profile.class);
        assertEquals(expected.getId(), actual.getId());
        assertEquals(expected.getUsername(), actual.getUsername());
        assertEquals(expected.getDescription(), actual.getDescription());
        assertEquals(expected.getAvatar(), actual.getAvatar());
        assertEquals(expected.getLink(), actual.getLink());
    }


    @Test
    public void test_getProfile_fail() throws Exception {

        MockHttpServletRequestBuilder request = MockMvcRequestBuilders.get("/api/v1/profile/4");
        ResultActions perform = mockMvc.perform(request);
        perform.andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
}