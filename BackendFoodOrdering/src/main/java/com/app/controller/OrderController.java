package com.app.controller;

 import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.OrderDto;
import com.app.entities.CartItemModel;
import com.app.entities.CartModel;
import com.app.entities.HotelModel;
import com.app.entities.OrderItemModel;
import com.app.entities.OrderModel;
import com.app.entities.OrderStatus;
import com.app.entities.UserModel;
import com.app.repository.CartRepository;
import com.app.repository.OrderItemRepository;
import com.app.repository.OrderRepository;
import com.app.repository.UserRepository;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class OrderController {
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private CartRepository cartRepo;
	
	@Autowired
	private OrderRepository orderRepo;
	
	@Autowired
	private OrderItemRepository orderItemRepo;
	
	@GetMapping("/order")
	public ResponseEntity<?> getOrders(@CurrentSecurityContext(expression = "authentication.name") String userEmail){
		UserModel currentUser = userRepo.findByEmail(userEmail);
		
		List<OrderModel> orders = orderRepo.findByCustomerId(currentUser.getId());
		List <OrderDto> ordersDto = new ArrayList<>();
		for(OrderModel order : orders) {
			ordersDto.add(new OrderDto(order));
		}
		
		return ResponseEntity.ok(ordersDto);
	}
	
	@GetMapping("/order/{hotelId}")
	public ResponseEntity<?> getOrdersByHotelId(@PathVariable Long hotelId){
		List<OrderModel> orders =orderRepo.findByHotelId(hotelId);
		List <OrderDto> ordersDto = new ArrayList<>();
		for(OrderModel order : orders) {
			ordersDto.add(new OrderDto(order));
		}
		return ResponseEntity.ok(ordersDto);
	}
	
	@PostMapping("/order/place")
	public ResponseEntity<?> placeOrder(@CurrentSecurityContext(expression = "authentication.name") String userEmail){
		
		UserModel currentUser = userRepo.findByEmail(userEmail);
		CartModel customerCart = cartRepo.findByCustomer(currentUser);
		List<CartItemModel> items = customerCart.getCartItems();
		List<OrderItemModel> orderItems = new ArrayList<>();
		HotelModel itemHotel = items.get(0).getItem().getHotel();
		
		items.forEach(i -> {
			OrderItemModel newOrderItem = new OrderItemModel();
			newOrderItem.setItem(i.getItem());
			newOrderItem.setQuantity(i.getQuantity());
			newOrderItem.setAmount(0.0);
			orderItems.add(newOrderItem);
			orderItemRepo.saveAndFlush(newOrderItem);
		});
		
		OrderModel newOrder = new OrderModel();
		newOrder.setCustomer(currentUser);
		newOrder.setHotel(itemHotel);
		newOrder.setOrderItems(orderItems);
		newOrder.setStatus(OrderStatus.PENDING);
		
		Double calcAmount = newOrder.calculateGrandTotal(orderItems);
		
		newOrder.setGrandTotal(calcAmount);

		orderRepo.saveAndFlush(newOrder);
		
		items.removeAll(items);
		cartRepo.saveAndFlush(customerCart);
		
		return ResponseEntity.ok().build();
	}
	
	@PostMapping("/order/{orderId}")
	public ResponseEntity<?> updateStatus(@PathVariable Long orderId, @RequestBody String status){
		OrderStatus newStatus = OrderStatus.valueOf(status);
		OrderModel orderToUpdate = orderRepo.findById(orderId).get();
		orderToUpdate.setStatus(newStatus);
		orderRepo.save(orderToUpdate);
		return ResponseEntity.ok().build();
	}
	
}
