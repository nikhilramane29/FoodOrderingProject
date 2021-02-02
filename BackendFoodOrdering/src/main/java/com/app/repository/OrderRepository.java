package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entities.OrderModel;

@Repository
public interface OrderRepository extends JpaRepository<OrderModel, Long> {
	List<OrderModel> findByCustomerId(Long customerId);
	List<OrderModel> findByHotelId(Long hotelId);
}
