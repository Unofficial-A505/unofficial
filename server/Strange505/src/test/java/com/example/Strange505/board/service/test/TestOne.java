package com.example.Strange505.board.service.test;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class TestOne {

    @Test
    public void test() {
        Member member = new Member();
        System.out.println(member.getClass());
    }
}
