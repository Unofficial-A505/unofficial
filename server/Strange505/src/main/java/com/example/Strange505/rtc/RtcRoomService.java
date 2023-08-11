package com.example.Strange505.rtc;

import com.example.Strange505.verificate.UUIDProvider;
import jakarta.persistence.LockModeType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class RtcRoomService {

    private final RtcRoomRepository rtcRoomRepository;

    public void outRoom() {

    }


    @Lock(value = LockModeType.PESSIMISTIC_WRITE)
    public String findRoom() {
        List<RtcRoom> rooms = rtcRoomRepository.findByManCountLow2();
        if (rooms.size() == 0) {
            return makeRoom();
        } else {
            RtcRoom room = rooms.get(0);
            room.countUP();
            return room.getName();
        }
    }

    public String makeRoom() {
        RtcRoom rtcRoom = RtcRoom.makeRoom();
        rtcRoom.countUP();
        rtcRoomRepository.save(rtcRoom);
        return rtcRoom.getName();
    }

}
