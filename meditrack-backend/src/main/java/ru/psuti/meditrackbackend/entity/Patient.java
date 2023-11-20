package ru.psuti.meditrackbackend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "firstname", length = 50)
    private String firstname;

    @Column(name = "lastname", length = 50)
    private String lastname;

    @Temporal(TemporalType.DATE)
    @Column(name = "birthday")
    private Date birthday;

    public enum Gender{
        MALE,
        FEMALE
    }

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name = "contacts")
    private String contacts;

}
