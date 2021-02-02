import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { HotelService } from '../hotel.service';
import { MenuItem } from '../menu-item.model';
import { HotelState } from '../store/hotel.state';

@Component({
  selector: 'app-edit-menu-item',
  templateUrl: './edit-menu-item.component.html',
  styleUrls: ['./edit-menu-item.component.css'],
})
export class EditMenuItemComponent implements OnInit {
  hotelId: number;
  menuId: number;

  itemName: string = '';
  itemPrice: number = null;
  available: boolean = null;

  @Select(HotelState.getSelectedHotelMenu) selectedHotelMenu$: Observable<
    MenuItem[]
  >;

  constructor(
    private hotelService: HotelService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('hotelId') && paramMap.has('menuId')) {
        this.hotelId = +paramMap.get('hotelId');
        this.menuId = +paramMap.get('menuId');
      }
    });

    this.selectedHotelMenu$.subscribe((menuItems) => {
      let menuItem: MenuItem;
      menuItem = menuItems.find((x) => x.id == this.menuId);

      this.itemName = menuItem.itemName;
      this.itemPrice = menuItem.itemPrice;
      this.available = menuItem.available;
    });
  }

  updateMenuItem(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.hotelService.updateMenuItem(
      this.hotelId,
      this.menuId,
      form.value.itemName,
      form.value.itemPrice,
      form.value.available
    );
  }
}
