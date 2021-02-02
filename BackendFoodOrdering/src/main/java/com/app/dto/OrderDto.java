package com.app.dto;

import java.util.List;

import com.app.entities.AddressModel;
import com.app.entities.OrderItemModel;
import com.app.entities.OrderModel;
import com.app.entities.OrderStatus;

public class OrderDto {
	private Long orderId;
	private Double grandTotal;
	private HotelDto hotel;
	private List<OrderItemModel> orderItems;
	private AddressModel customerAddress;
	private OrderStatus status;

	public OrderDto(OrderModel order) {
		super();
		this.orderId = order.getId();
		this.grandTotal = order.getGrandTotal();
		this.hotel = new HotelDto(order.getHotel());
		this.orderItems = order.getOrderItems();
		this.customerAddress = order.getCustomer().getAddress();
		this.status = order.getStatus();
	}

	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	public Double getGrandTotal() {
		return grandTotal;
	}

	public void setGrandTotal(Double grandTotal) {
		this.grandTotal = grandTotal;
	}

	public HotelDto getHotel() {
		return hotel;
	}

	public void setHotel(HotelDto hotel) {
		this.hotel = hotel;
	}

	public List<OrderItemModel> getOrderItems() {
		return orderItems;
	}

	public void setOrderItems(List<OrderItemModel> orderItems) {
		this.orderItems = orderItems;
	}

	public AddressModel getCustomerAddress() {
		return customerAddress;
	}

	public void setCustomerAddress(AddressModel customerAddress) {
		this.customerAddress = customerAddress;
	}

	public OrderStatus getStatus() {
		return status;
	}

	public void setStatus(OrderStatus status) {
		this.status = status;
	}

}
