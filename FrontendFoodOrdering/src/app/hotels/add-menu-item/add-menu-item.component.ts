import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HotelService } from '../hotel.service';

@Component({
  selector: 'app-add-menu-item',
  templateUrl: './add-menu-item.component.html',
  styleUrls: ['./add-menu-item.component.css'],
})
export class AddMenuItemComponent implements OnInit {
  hotelId: number;

  constructor(
    private hotelService: HotelService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('hotelId')) {
        this.hotelId = +paramMap.get('hotelId');
      }
    });
  }

  addMenuItem(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.hotelService.addMenuItem(
      this.hotelId,
      form.value.itemName,
      form.value.itemPrice,
      form.value.available
    );
  }
}
