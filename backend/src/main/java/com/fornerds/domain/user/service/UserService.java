package com.fornerds.domain.user.service;

import com.fornerds.domain.auth.dto.SignupRequestDto;
import com.fornerds.domain.quest.entity.Reward;
import com.fornerds.domain.quest.entity.RewardType;
import com.fornerds.domain.user.dto.UserDto;
import com.fornerds.domain.user.entity.Role;
import com.fornerds.domain.user.entity.User;
import com.fornerds.domain.user.repository.UserRepository;
import com.fornerds.global.exception.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ApiException("USER_NOT_FOUND", "User not found with id: " + id, HttpStatus.NOT_FOUND));
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException("USER_NOT_FOUND", "User not found with email: " + email, HttpStatus.NOT_FOUND));
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public User updateUserRewardByRewardType(User user, Reward reward) {
        if(reward.getRewardType()== RewardType.valueOf("EXP")){
            user.setExp(user.getExp() + reward.getRewardAmount());
        } else if (reward.getRewardType()== RewardType.valueOf("CASH")) {
            user.setCash(user.getCash() + reward.getRewardAmount());
        } else if (reward.getRewardType()== RewardType.valueOf("POINT")) {
            user.setPoint(user.getPoint() + reward.getRewardAmount());
        }

        return userRepository.save(user);
    }
}