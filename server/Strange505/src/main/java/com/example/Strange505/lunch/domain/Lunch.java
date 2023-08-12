package com.example.Strange505.lunch.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity(name = "lunch")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Table(name = "lunch",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "lunch_unique",
                        columnNames = {
                                "date",
                                "local",
                                "course_name"
                        }
                )
        }
)
public class Lunch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lunch_id")
    private Long id;
    private String date;
    @Column(name="restaurant_id")
    private String restaurantId;
    @Column(name="image_url")
    private String imageUrl;
    private String name;
    private String detail;
    private Long likes;
    private String local;
    @Column(name="course_name")
    private String courseName;

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        Lunch other = (Lunch) obj;
        if (this.date.equals(other.getDate()) && this.local.equals(other.getLocal()) && this.courseName.equals(other.getCourseName())) {
            return true;
        }
        return false;
    }

    @Override
    public int hashCode() {
        return (int) (id%Integer.MAX_VALUE);
    }
}
