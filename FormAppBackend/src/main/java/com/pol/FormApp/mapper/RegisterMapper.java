package com.pol.FormApp.mapper;

import com.pol.FormApp.dto.RegisterRequestDTO;
import com.pol.FormApp.dto.RegisterResponseDTO;
import com.pol.FormApp.entity.User;

public class RegisterMapper {
    public static User toEntity(RegisterRequestDTO registerRequestDTO){

        return User.builder()
                .country(registerRequestDTO.getCountry())
                .email(registerRequestDTO.getEmail())
                .fullName(registerRequestDTO.getFullName())
                .gender(registerRequestDTO.getGender())
                .termsAccepted(registerRequestDTO.getTermsAccepted())
                .password(registerRequestDTO.getPassword())
                .build();
    }

    public static RegisterResponseDTO toResponseDTO(User user){
        return RegisterResponseDTO.builder()
                .id(user.getId())
                .country(user.getCountry())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .gender(user.getGender())
                .termsAccepted(user.isTermsAccepted())
                .password(user.getPassword())
                .build();
    }
}
