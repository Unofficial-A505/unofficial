package com.example.Strange505.rtc;

import java.util.List;

public interface RtcCustomQuery {
    List<RtcRoom> findByManCountLow2(String sessionId);
}
