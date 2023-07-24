package com.example.Strange505.verificate;

import java.util.UUID;

public class UUIDProvider {

    public static String getUuid(String seed) {
        return UUID.nameUUIDFromBytes(seed.getBytes()).toString();
    }

}
