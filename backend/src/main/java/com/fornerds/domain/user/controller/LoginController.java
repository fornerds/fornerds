package com.fornerds.domain.user.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {
    @GetMapping("/")
    public String home() {
        return "login-success"; // 리디렉션할 뷰 이름
    }
}