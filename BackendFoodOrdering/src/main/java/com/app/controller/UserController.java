package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.AddressModel;
import com.app.entities.UserModel;
import com.app.repository.AddressRepository;
import com.app.repository.UserRepository;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class UserController {

	@Autowired
	UserRepository userRepo;

	@Autowired
	AddressRepository addressRepo;

	@GetMapping("/api/account")
	public ResponseEntity<UserModel> getAccountDetails(
			@CurrentSecurityContext(expression = "authentication.name") String userEmail) {
		UserModel currentUser = userRepo.findByEmail(userEmail);
		return ResponseEntity.ok(currentUser);
	}

	@PostMapping("/api/account/address")
	public ResponseEntity<?> addAddress(@CurrentSecurityContext(expression = "authentication.name") String userEmail,
			@RequestBody AddressModel address) {
		UserModel currentUser = userRepo.findByEmail(userEmail);
		currentUser.setAddress(address);
		return ResponseEntity.ok(userRepo.save(currentUser));
	}

	@PutMapping("/api/account/address")
	public ResponseEntity<?> updateAddress(@RequestBody AddressModel reqAdd) {

		if (addressRepo.existsById(reqAdd.getId())) {
			addressRepo.findById(reqAdd.getId()).map(userAdd -> {
				userAdd.setAddressLine1(reqAdd.getAddressLine1());
				userAdd.setAddressLine2(reqAdd.getAddressLine2());
				userAdd.setPincode(reqAdd.getPincode());
				userAdd.setCity(reqAdd.getCity());
				userAdd.setState(reqAdd.getState());
				userAdd.setCountry(reqAdd.getCountry());
				return addressRepo.save(userAdd);
			});

			return ResponseEntity.ok().build();
		}
		return ResponseEntity.notFound().build();
	}

	@PutMapping("/api/account")
	public ResponseEntity<?> updateAccount(@RequestBody UserModel reqAcc) {
		if (userRepo.existsById(reqAcc.getId())) {
			userRepo.findById(reqAcc.getId()).map(userAcc -> {
				userAcc.setFirstName(reqAcc.getFirstName());
				userAcc.setLastName(reqAcc.getLastName());
				userAcc.setMobileNo(reqAcc.getMobileNo());
				userAcc.setEmail(reqAcc.getEmail());

				return userRepo.save(userAcc);
			});

			return ResponseEntity.ok().build();
		}
		return ResponseEntity.notFound().build();
	}
}
