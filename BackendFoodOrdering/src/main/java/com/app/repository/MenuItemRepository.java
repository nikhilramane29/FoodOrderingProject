package com.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entities.MenuItemModel;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItemModel, Long> {
	Page<MenuItemModel> findByHotelId(Long hotelId, Pageable pageable);

	Optional<MenuItemModel> findByIdAndHotelId(Long id, Long hotelId);
	List<MenuItemModel> deleteByHotelId(Long hotelId);
}
