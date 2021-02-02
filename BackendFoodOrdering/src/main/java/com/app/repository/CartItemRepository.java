package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.CartItemModel;

public interface CartItemRepository extends JpaRepository<CartItemModel, Long> {
	
}
