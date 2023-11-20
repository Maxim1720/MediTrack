package ru.psuti.meditrackbackend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import ru.psuti.meditrackbackend.entity.Patient;

@CrossOrigin(originPatterns = "**")
@RepositoryRestResource
public interface PatientDao extends JpaRepository<Patient, Long> {

}