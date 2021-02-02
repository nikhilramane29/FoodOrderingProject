package com.app.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "order_items")
public class OrderItemModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne(targetEntity = MenuItemModel.class)
	private MenuItemModel item;

	private int quantity;

	private Double amount;

	public OrderItemModel() {
		super();
	}

	public OrderItemModel( MenuItemModel item, int quantity) {
		super();
		this.item = item;
		this.quantity = quantity;
		this.amount = item.getItemPrice() * this.quantity;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public MenuItemModel getItem() {
		return item;
	}

	public void setItem(MenuItemModel item) {
		this.item = item;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		if (amount == null || amount == 0) {
			amount = this.item.getItemPrice() * this.quantity;
		}
		this.amount = amount;
	}

	@Override
	public String toString() {
		return "OrderItemModel [id=" + id + ", item=" + item + ", quantity=" + quantity + ", amount=" + amount + "]";
	}

}
