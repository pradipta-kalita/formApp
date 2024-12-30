package com.pol.FormApp.service;

import com.pol.FormApp.dto.RegisterRequestDTO;
import com.pol.FormApp.dto.RegisterResponseDTO;
import com.pol.FormApp.mapper.RegisterMapper;
import com.pol.FormApp.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public RegisterResponseDTO register(RegisterRequestDTO registerRequestDTO){

        return RegisterMapper.toResponseDTO(userRepository.save(RegisterMapper.toEntity(registerRequestDTO)));
    }
}
