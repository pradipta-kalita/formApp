package com.pol.FormApp.controller;

import com.pol.FormApp.dto.ApiResponseDTO;
import com.pol.FormApp.dto.RegisterRequestDTO;
import com.pol.FormApp.dto.RegisterResponseDTO;
import com.pol.FormApp.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class RegisterController {
    private final UserService userService;

    public RegisterController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponseDTO<RegisterResponseDTO>> register(@RequestBody @Valid RegisterRequestDTO registerRequestDTO){
        return ResponseEntity.ok(ApiResponseDTO.<RegisterResponseDTO>builder()
                        .message("User registered successfully")
                        .data(userService.register(registerRequestDTO))
                .build());
    }
}
