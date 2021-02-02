package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entities.AddressModel;

@Repository
public interface AddressRepository extends JpaRepository<AddressModel, Long> {

}
