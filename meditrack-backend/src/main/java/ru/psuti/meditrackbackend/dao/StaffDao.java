package ru.psuti.meditrackbackend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import ru.psuti.meditrackbackend.entity.Staff;


@RepositoryRestResource(path = "staff", collectionResourceRel = "staff")
public interface StaffDao extends JpaRepository<Staff, Long> {

}