package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "menu_items")
public class MenuItemModel extends AuditModel {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "item_name", nullable = false)
	private String itemName;

	@Column(name = "item_price", nullable = false)
	private double itemPrice;

	private boolean available;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "hotel_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private HotelModel hotel;

	public MenuItemModel() {
		super();
	}

	public MenuItemModel(Long id, String itemName, double itemPrice, boolean available, HotelModel hotel) {
		super();
		this.id = id;
		this.itemName = itemName;
		this.itemPrice = itemPrice;
		this.available = available;
		this.hotel = hotel;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public double getItemPrice() {
		return itemPrice;
	}

	public void setItemPrice(double itemPrice) {
		this.itemPrice = itemPrice;
	}

	public boolean isAvailable() {
		return available;
	}

	public void setAvailable(boolean available) {

		this.available = available;
	}

	public HotelModel getHotel() {
		return hotel;
	}

	public void setHotel(HotelModel hotel) {
		this.hotel = hotel;
	}

	@Override
	public String toString() {
		return "MenuItemList [id=" + id + ", itemName=" + itemName + ", itemPrice=" + itemPrice + ", available="
				+ available + ", hotel=" + hotel + "]";
	}

}
