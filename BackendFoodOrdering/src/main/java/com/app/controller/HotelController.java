package com.app.controller;

import java.io.IOException;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.cust_excs.ResourceNotFoundException;
import com.app.entities.AddressModel;
import com.app.entities.HotelModel;
import com.app.entities.MenuItemModel;
import com.app.entities.UserModel;
import com.app.repository.AddressRepository;
import com.app.repository.HotelRepository;
import com.app.repository.MenuItemRepository;
import com.app.repository.UserRepository;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class HotelController {

	@Autowired
	private HotelRepository hotelRepository;

	@Autowired
	private MenuItemRepository menuItemRepository;

	@Autowired
	private AddressRepository addressRepo;

	@Autowired
	private UserRepository userRepo;

	@GetMapping("/hotels")
	public Page<HotelModel> getAllHotels(Pageable pageable) {
		return hotelRepository.findAll(pageable);
	}

	@PostMapping("/hotels")
	public HotelModel createHotel(@Valid @RequestBody HotelModel hotel, @RequestParam(required = false) String email) {
		if (email != null) {
			UserModel vendorByEmail = userRepo.findByEmail(email);
			hotel.setVendor(vendorByEmail);
		}
		return hotelRepository.save(hotel);
	}

	@GetMapping("/hotels/{hotelId}")
	public HotelModel getHotelById(@PathVariable Long hotelId) {
		return hotelRepository.findById(hotelId).get();
	}

	@PutMapping("/hotels/{hotelId}")
	public HotelModel updateHotel(@PathVariable Long hotelId, @Valid @RequestBody HotelModel hotelRequest,
			@RequestParam(required = false) String email) {

		return hotelRepository.findById(hotelId).map(hotel -> {
			hotel.setHotelName(hotelRequest.getHotelName());
			hotel.setMobileNo(hotelRequest.getMobileNo());
			AddressModel reqAdd = hotelRequest.getAddress();

			if (email != null) {
				UserModel vendorByEmail = userRepo.findByEmail(email);
				hotel.setVendor(vendorByEmail);
			}

			if (addressRepo.existsById(reqAdd.getId())) {
				addressRepo.findById(reqAdd.getId()).map(hotelAdd -> {
					hotelAdd.setAddressLine1(reqAdd.getAddressLine1());
					hotelAdd.setAddressLine2(reqAdd.getAddressLine2());
					hotelAdd.setPincode(reqAdd.getPincode());
					hotelAdd.setCity(reqAdd.getCity());
					hotelAdd.setState(reqAdd.getState());
					hotelAdd.setCountry(reqAdd.getCountry());
					return addressRepo.save(hotelAdd);
				});
			} else {
				hotel.setAddress(reqAdd);
			}

			return hotelRepository.save(hotel);
		}).orElseThrow(() -> new ResourceNotFoundException("HotelId " + hotelId + " not found"));
	}

	@DeleteMapping("/hotels/{hotelId}")
	public ResponseEntity<?> deleteHotel(@PathVariable Long hotelId) {
		return hotelRepository.findById(hotelId).map(hotel -> {
			hotelRepository.delete(hotel);
			userRepo.delete(hotel.getVendor());
			return ResponseEntity.ok().build();
		}).orElseThrow(() -> new ResourceNotFoundException("HotelId " + hotelId + " not found"));
	}

	@PostMapping("/hotels/{hotelId}/image")
	public ResponseEntity<?> fileUploadWithParams(@PathVariable Long hotelId, @RequestParam MultipartFile imageFile) {

		HotelModel hotel = hotelRepository.findById(hotelId).get();
		try {

			hotel.setImage(imageFile.getBytes());
			hotel.setImageContentType(imageFile.getContentType());
		} catch (IOException e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}

		hotelRepository.save(hotel);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/hotels/{hotelId}/menu")
	public Page<MenuItemModel> getAllMenuItemsByHotelId(@PathVariable(value = "hotelId") Long hotelId,
			Pageable pageable) {
		return menuItemRepository.findByHotelId(hotelId, pageable);
	}

	@PostMapping("/hotels/{hotelId}/menu")
	public MenuItemModel createMenuItem(@PathVariable(value = "hotelId") Long hotelId,
			@Valid @RequestBody MenuItemModel menuItem) {
		return hotelRepository.findById(hotelId).map(hotel -> {
			menuItem.setHotel(hotel);
			return menuItemRepository.save(menuItem);
		}).orElseThrow(() -> new ResourceNotFoundException("HotelId " + hotelId + " not found"));
	}

	@PutMapping("/hotels/{hotelId}/menu/{menuId}")
	public MenuItemModel updateMenuItem(@PathVariable(value = "hotelId") Long hotelId,
			@PathVariable(value = "menuId") Long menuId, @Valid @RequestBody MenuItemModel menuRequest) {
		if (!hotelRepository.existsById(hotelId)) {
			throw new ResourceNotFoundException("HotelId " + hotelId + " not found");
		}

		return menuItemRepository.findById(menuId).map(menu -> {
			menu.setItemName(menuRequest.getItemName());
			menu.setItemPrice(menuRequest.getItemPrice());
			menu.setAvailable(menuRequest.isAvailable());
			return menuItemRepository.save(menu);
		}).orElseThrow(() -> new ResourceNotFoundException("menuId " + menuId + "not found"));
	}

	@DeleteMapping("/hotels/{hotelId}/menu/{menuId}")
	public ResponseEntity<?> deleteComment(@PathVariable(value = "hotelId") Long hotelId,
			@PathVariable(value = "menuId") Long menuId) {
		return menuItemRepository.findByIdAndHotelId(menuId, hotelId).map(menu -> {
			menuItemRepository.delete(menu);
			return ResponseEntity.ok().build();
		}).orElseThrow(() -> new ResourceNotFoundException(
				"Menu Item not found with id " + menuId + " and hotelId " + hotelId));
	}

}
