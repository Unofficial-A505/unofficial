package com.example.Strange505.verificate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.lang.NonNull;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Emails {
    @Id @GeneratedValue
    private Long id;
    @NonNull
    private String email;

    public Emails(String email) {
        this.email = email;
    }
}
