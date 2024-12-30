package com.pol.FormApp.dto;

import com.pol.FormApp.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterResponseDTO {
    private UUID id;
    private String fullName;
    private String email;
    private String password;
    private User.Gender gender;
    private String country;
    private boolean termsAccepted;
}
