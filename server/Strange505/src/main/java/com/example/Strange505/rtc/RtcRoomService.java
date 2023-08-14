package com.example.Strange505.rtc;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class RtcRoomService {

    private final RtcRoomRepository rtcRoomRepository;

//    @Lock(value = LockModeType.PESSIMISTIC_WRITE)
    public String findRoom(String sessionId) {
//        List<RtcRoom> rooms = rtcRoomRepository.findByManCountLow2(sessionId);
        List<RtcRoom> rooms = rtcRoomRepository.findAll();

        List<RtcRoom> result = rooms.stream().filter(room -> !room.getName().equals(sessionId) && room.getManCount() < 2).toList();

        if (result.size() == 0) {
            return makeRoom();
        } else {
            RtcRoom room = result.get(getRandom(result.size()));
            room.countUP();
            return room.getName();
        }
    }

//    @Lock(value = LockModeType.PESSIMISTIC_WRITE)
    public void leaveSession(String sessionId) {
        RtcRoom room = rtcRoomRepository.findByName(sessionId).orElse(null);
        if (room == null) {
            return;
        }
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
