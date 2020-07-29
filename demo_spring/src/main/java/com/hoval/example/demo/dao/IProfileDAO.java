package com.hoval.example.demo.dao;

import com.hoval.example.demo.data.Profile;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IProfileDAO extends JpaRepository<Profile, Long>{
    
}