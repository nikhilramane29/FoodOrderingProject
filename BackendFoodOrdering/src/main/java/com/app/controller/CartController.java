package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.CartItemModel;
import com.app.entities.CartModel;
import com.app.entities.UserModel;
import com.app.repository.CartItemRepository;
import com.app.repository.CartRepository;
import com.app.repository.UserRepository;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class CartController {

	@Autowired
	UserRepository userRepo;

	@Autowired
	CartRepository cartRepo;

	@Autowired
	CartItemRepository cartItemRepo;

	@GetMapping("/cart")
	public ResponseEntity<?> getCustomerCart(
			@CurrentSecurityContext(expression = "authentication.name") String userEmail) {

		UserModel currentUser = userRepo.findByEmail(userEmail);
		CartModel customerCart = cartRepo.findByCustomer(currentUser);
		if (customerCart == null) {
			customerCart = new CartModel();
			customerCart.setCustomer(currentUser);
			cartRepo.save(customerCart);
		}
		return ResponseEntity.ok(customerCart.getCartItems());
	}

	@PostMapping("/cart")
	public ResponseEntity<?> addItemToCart(@RequestBody CartItemModel cartItemFromUser,
			@CurrentSecurityContext(expression = "authentication.name") String userEmail) {

		CartModel customerCart = getCartByUserEmail(userEmail);
		List<CartItemModel> items = customerCart.getCartItems();
		items.add(cartItemFromUser);
		cartRepo.saveAndFlush(customerCart);
		return ResponseEntity.ok(customerCart.getCartItems());
	}

	@DeleteMapping("/cart/{cartItemId}")
	public ResponseEntity<?> removeItemFromCart(@PathVariable Long cartItemId,
			@CurrentSecurityContext(expression = "authentication.name") String userEmail) {
		System.out.println("in remove cart item with id " + cartItemId);
		CartModel customerCart = getCartByUserEmail(userEmail);
		List<CartItemModel> items = customerCart.getCartItems();
		items.removeIf(c -> c.getId().equals(cartItemId));
		cartRepo.saveAndFlush(customerCart);
		return ResponseEntity.ok(customerCart.getCartItems());
	}

	@DeleteMapping("/cart")
	public ResponseEntity<?> clearCart(@CurrentSecurityContext(expression = "authentication.name") String userEmail) {
		CartModel customerCart = getCartByUserEmail(userEmail);
		List<CartItemModel> items = customerCart.getCartItems();
		items.removeAll(items);
		cartRepo.saveAndFlush(customerCart);
		return ResponseEntity.ok().build();
	}

	@PutMapping("/cart/updateQty")
	public ResponseEntity<?> changeInCartItemQuantity(@RequestBody CartItemModel cartItem) {
		CartItemModel cartItemFromDb = cartItemRepo.findById(cartItem.getId()).get();
		cartItemFromDb.setQuantity(cartItem.getQuantity());
		cartItemRepo.saveAndFlush(cartItemFromDb);
		return ResponseEntity.ok(cartItemFromDb);
	}

	private CartModel getCartByUserEmail(String userEmail) {
		UserModel currentUser = userRepo.findByEmail(userEmail);
		return cartRepo.findByCustomer(currentUser);
	}

}
