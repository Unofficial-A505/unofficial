package com.example.Strange505.board.service.test;

import jakarta.persistence.*;

import java.util.ArrayList;

@Entity
public class Team {
    @Id
    @GeneratedValue
    @Column(name = "team_id")
    private Long id;

    @OneToMany(mappedBy = "team")
    private ArrayList<Member> list;
}
