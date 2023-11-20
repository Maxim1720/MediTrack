package ru.psuti.meditrackbackend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.psuti.meditrackbackend.entity.Equipment;

public interface EquipmentDao extends JpaRepository<Equipment, Long> {
}