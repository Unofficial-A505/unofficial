package com.example.Strange505.rtc;

import org.springframework.data.jpa.repository.JpaRepository;


public interface RtcRoomRepository extends JpaRepository<RtcRoom, Long>, RtcCustomQuery{

}
