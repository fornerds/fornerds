package com.fornerds.repository;

import com.fornerds.entity.Report;
import com.fornerds.entity.ReportStatus;
import com.fornerds.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByUser(User user);
    List<Report> findByReportedUser(User reportedUser);
    List<Report> findByStatus(ReportStatus status);
    // 추가적인 쿼리 메서드 정의
}
