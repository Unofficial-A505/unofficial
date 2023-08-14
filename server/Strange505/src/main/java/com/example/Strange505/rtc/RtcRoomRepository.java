package com.example.Strange505.rtc;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface RtcRoomRepository extends JpaRepository<RtcRoom, Long>, RtcCustomQuery{

    Optional<RtcRoom> findByName(String sessionId);
}
