package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.CartModel;
import com.app.entities.UserModel;

public interface CartRepository extends JpaRepository<CartModel, Long> {
	CartModel findByCustomer(UserModel customer);
}
