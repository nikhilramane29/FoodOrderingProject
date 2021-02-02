package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.app.entities.OrderItemModel;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItemModel, Long> {

}