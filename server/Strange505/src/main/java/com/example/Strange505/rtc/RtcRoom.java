package com.example.Strange505.rtc;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Builder
@AllArgsConstructor
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RtcRoom {
    @Id @GeneratedValue
    @Column(name = "rtc_room_id")
    private Long id;

    private String name;

    private LocalDateTime createTime;

    private int manCount;

    public static RtcRoom makeRoom() {
        RtcRoom room = new RtcRoom();
        room.name = UUID.randomUUID().toString();
        room.createTime = LocalDateTime.now();
        room.manCount = 0;
        return room;
    }

    public void countUP() {
        this.manCount += 1;
    }

    public int countDown() {
        this.manCount -= 1;
        return this.manCount;
    }
}
