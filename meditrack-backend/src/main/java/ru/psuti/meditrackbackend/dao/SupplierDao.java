package ru.psuti.meditrackbackend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.psuti.meditrackbackend.entity.Supplier;

public interface SupplierDao extends JpaRepository<Supplier, Long> {

}