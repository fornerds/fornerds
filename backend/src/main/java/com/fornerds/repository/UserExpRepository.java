package com.fornerds.repository;

import com.fornerds.entity.User;
import com.fornerds.entity.UserExp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserExpRepository extends JpaRepository<UserExp, Long> {
    List<UserExp> findByUser(User user);
    List<UserExp> findByUserAndCategoryId(User user, Long categoryId);
    List<UserExp> findByUserAndTechStackId(User user, Long techStackId);
    List<UserExp> findByUserAndDevLanguageId(User user, Long devLanguageId);
    // 추가적인 쿼리 메서드 정의
}
