package com.app.dto;

import com.app.entities.HotelModel;

public class HotelDto {
	private Long id;
	private String hotelName;
	private String mobileNo;

	public HotelDto(HotelModel hotel) {
		super();
		this.id = hotel.getId();
		this.hotelName = hotel.getHotelName();
		this.mobileNo = hotel.getMobileNo();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getHotelName() {
		return hotelName;
	}

	public void setHotelName(String hotelName) {
		this.hotelName = hotelName;
	}

	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	@Override
	public String toString() {
		return "HotelDto [hotelId=" + id + ", hotelName=" + hotelName + ", mobileNo=" + mobileNo + "]";
	}

}
