package com.app.entities;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "orders")
public class OrderModel extends AuditModel {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "customer_id", nullable = false)
	private UserModel customer;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "hotel_id", nullable = false)
//	@OnDelete(action = OnDeleteAction.CASCADE)
//	@JsonIgnore
	private HotelModel hotel;

	@OneToMany(targetEntity = OrderItemModel.class, cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
	private List<OrderItemModel> orderItems = new ArrayList<>();

	private Double grandTotal;

	@Enumerated(EnumType.STRING)
	@Column(length = 20)
	private OrderStatus status;

	public OrderModel() {
		super();
	}

	public OrderModel(UserModel customer, HotelModel hotel, List<OrderItemModel> orderItems) {
		super();
		this.customer = customer;
		this.hotel = hotel;
		this.orderItems = orderItems;
		this.orderItems.forEach(i -> this.grandTotal += i.getAmount());
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public UserModel getCustomer() {
		return customer;
	}

	public void setCustomer(UserModel customer) {
		this.customer = customer;
	}

	public HotelModel getHotel() {
		return hotel;
	}

	public void setHotel(HotelModel hotel) {
		this.hotel = hotel;
	}

	public List<OrderItemModel> getOrderItems() {
		return orderItems;
	}

	public void setOrderItems(List<OrderItemModel> orderItems) {
		this.orderItems = orderItems;
	}

	public Double getGrandTotal() {
		return grandTotal;
	}

	public void setGrandTotal(Double grandTotal) {
		this.grandTotal = grandTotal;
	}

	public OrderStatus getStatus() {
		return status;
	}

	public void setStatus(OrderStatus status) {
		this.status = status;
	}

	public Double calculateGrandTotal(List<OrderItemModel> orderItems) {
		Double amount = 0.0;
		Iterator<OrderItemModel> itr = orderItems.iterator();

		while (itr.hasNext()) {
			amount += itr.next().getAmount();
		}

		return amount;
	}

	@Override
	public String toString() {
		return "OrderModel [id=" + id + ", customer=" + customer + ", hotel=" + hotel + ", orderItems=" + orderItems
				+ ", grandTotal=" + grandTotal + ", status=" + status + "]";
	}

}
