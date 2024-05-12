package com.fornerds.repository;

import com.fornerds.entity.Ranking;
import com.fornerds.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RankingRepository extends JpaRepository<Ranking, Long> {
    List<Ranking> findByType(String type);
    List<Ranking> findByUser(User user);
    // 추가적인 쿼리 메서드 정의
}
