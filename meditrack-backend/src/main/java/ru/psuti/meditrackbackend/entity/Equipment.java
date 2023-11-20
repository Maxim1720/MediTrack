package ru.psuti.meditrackbackend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
public class Equipment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", length = 50)
    private String name;

    @Column(name = "manufacturer", length = 50)
    private String manufacturer;

    @Temporal(TemporalType.DATE)
    @Column(name = "acquisition_date")
    private Date acquisitionDate;

    @Column(name = "inventory_number")
    private String inventoryNumber;

    @Column(name = "type")
    private String type;

}
