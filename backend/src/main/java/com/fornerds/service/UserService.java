package com.fornerds.service;

import com.fornerds.entity.User;
import com.fornerds.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class UserService {
    private final UserRepository userRepository;
    
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public User createUser(User user) {
        // 사용자 생성 로직 구현
        return user;
    }
    
    public User getUserById(Long id) {
        // 사용자 조회 로직 구현
        return null;
    }
    
    public User updateUser(User user) {
        // 사용자 정보 수정 로직 구현
        return user;
    }
    
    public void deleteUser(Long id) {
        // 사용자 삭제 로직 구현
    }
    
    // 추가적인 로직 구현
}
