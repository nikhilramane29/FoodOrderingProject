package com.app.entities;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "hotels")
public class HotelModel extends AuditModel {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "hotel_name", nullable = false)
	private String hotelName;

	@Column(nullable = false, name = "mobile_no", unique = true, length = 10)
	private String mobileNo;

	@OneToOne(targetEntity = AddressModel.class, cascade = CascadeType.ALL)
	private AddressModel address;

	@OneToOne(targetEntity = UserModel.class, cascade = CascadeType.ALL)
	@JsonIgnore
	private UserModel vendor;

	@Lob
	private byte[] image;
	@Column(length = 30)
	private String imageContentType;

	public HotelModel() {
		super();
	}

	public HotelModel(Long id, String hotelName, String mobileNo, AddressModel address) {
		super();
		this.id = id;
		this.hotelName = hotelName;
		this.mobileNo = mobileNo;
		this.address = address;
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

	public AddressModel getAddress() {
		return address;
	}

	public void setAddress(AddressModel address) {
		this.address = address;
	}

	public UserModel getVendor() {
		return vendor;
	}

	public void setVendor(UserModel vendor) {
		this.vendor = vendor;
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	public String getImageContentType() {
		return imageContentType;
	}

	public void setImageContentType(String imageContentType) {
		this.imageContentType = imageContentType;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (id ^ (id >>> 32));
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		HotelModel other = (HotelModel) obj;
		if (id != other.id)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "HotelModel [id=" + id + ", hotelName=" + hotelName + ", mobileNo=" + mobileNo + ", address=" + address
				+ ", vendor=" + vendor + "]";
	}

}
