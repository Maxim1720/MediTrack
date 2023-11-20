package ru.psuti.meditrackbackend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import ru.psuti.meditrackbackend.entity.Appointment;

@RepositoryRestResource
public interface AppointmentDao extends JpaRepository<Appointment, Long> {

}