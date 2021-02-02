package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.HotelModel;
import com.app.entities.UserModel;
import com.app.repository.HotelRepository;
import com.app.repository.MenuItemRepository;
import com.app.repository.UserRepository;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/vendor")
public class VendorController {

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private HotelRepository hotelRepo;
	
	@Autowired
	private MenuItemRepository menuItemRepository;
	

	@GetMapping()
	public ResponseEntity<?> getHotelDetails(
			@CurrentSecurityContext(expression = "authentication.name") String vendorEmail) {
		HotelModel vendorHotel = getHotelByVendorEmail(vendorEmail);
		return ResponseEntity.ok(vendorHotel);
	}
	
	@GetMapping("/hotel/menu")
	public ResponseEntity<?> getHotelMenuDetails(
			@CurrentSecurityContext(expression = "authentication.name") String vendorEmail, Pageable pageable) {
		HotelModel vendorHotel = getHotelByVendorEmail(vendorEmail);
		menuItemRepository.findByHotelId(vendorHotel.getId(), pageable);
		return ResponseEntity.ok(menuItemRepository.findByHotelId(vendorHotel.getId(), pageable));
	}
	
	private HotelModel getHotelByVendorEmail(String vendorEmail) {
		UserModel currentUser = userRepo.findByEmail(vendorEmail);
		return hotelRepo.findByVendor(currentUser);
	}

}
