package com.example.Strange505.rtc;

import jakarta.persistence.LockModeType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
@RequiredArgsConstructor
public class RtcRoomService {

    private final RtcRoomRepository rtcRoomRepository;

    @Lock(value = LockModeType.PESSIMISTIC_WRITE)
    public String findRoom() {
        List<RtcRoom> rooms = rtcRoomRepository.findByManCountLow2();
        if (rooms.size() == 0) {
            return makeRoom();
        } else {
            RtcRoom room = rooms.get(getRandom(rooms.size()));
            room.countUP();
            return room.getName();
        }
    }

    @Lock(value = LockModeType.PESSIMISTIC_WRITE)
    public void leaveSession(String sessionId) {
        RtcRoom room = rtcRoomRepository.findByName(sessionId).orElseThrow(()->new NoSuchElementException("존재하지 않는 방입니다."));
        int nowCount = room.countDown();
        if (nowCount == 0) {
            rtcRoomRepository.delete(room);
        }
    }

    private int getRandom(int size) {
        double num = Math.random();
        int rndNum = (int)(num * size);
        return rndNum;
    }

    public String makeRoom() {
        RtcRoom rtcRoom = RtcRoom.makeRoom();
        rtcRoom.countUP();
        rtcRoomRepository.save(rtcRoom);
        return rtcRoom.getName();
    }
}
