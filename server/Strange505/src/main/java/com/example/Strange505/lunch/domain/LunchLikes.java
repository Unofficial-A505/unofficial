package com.example.Strange505.lunch.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Table(name = "lunch_likes",
        uniqueConstraints = {
            @UniqueConstraint(
                    name = "lunch_like_unique",
                    columnNames = {
                            "lunch_id",
                            "user_id"
                    }
            )
        }
)
public class LunchLikes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "lunch_id")
    private Long lunchId;
    @Column(name = "user_id")
    private Long userId;
}
