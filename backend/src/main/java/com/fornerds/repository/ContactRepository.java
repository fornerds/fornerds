package com.fornerds.repository;

import com.fornerds.entity.Contact;
import com.fornerds.entity.ContactStatus;
import com.fornerds.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    List<Contact> findByUser(User user);
    List<Contact> findByStatus(ContactStatus status);
    // 추가적인 쿼리 메서드 정의
}
