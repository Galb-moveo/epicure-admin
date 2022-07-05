import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { BehaviorSubject, switchMap } from 'rxjs';
import { ApiService } from '../services/api.service';

export interface restaurantBodyReq {
  name: string;
  image: string;
  isPopular: boolean;
  Chef: any;
  isActive: boolean;
  SignatureDish: any;
}

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
})
export class RestaurantsComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private toastService: HotToastService,
  ) {}

  teams: any = [];
  dataSource: any = [];

  title = 'Add Restaurant';
  isActive: boolean = true;
  selectedRestaurant: string = '';

  isAddRestaurantOpen: boolean = false;
  isEditRestaurantOpen: boolean = false;
  isDeleteRestaurantOpen: boolean = false;
  chefsArray: any = [];
  chefs: any = [];
  token: any = localStorage.getItem('token');
  chefName: FormControl = new FormControl();
  displayedColumns: string[] = [
    'image',
    'name',
    'popular',
    'chef',
    'edit',
    'delete',
  ];
  //dataSource: any = [];
  restaurantsArray: any = [];
  dishesArray: any = [];
  dishes: any = [];
  restaurantModal = new FormGroup({});

  ngOnInit(): void {
    this.restaurantModal = this.fb.group({
      name: new FormControl(),
      image: new FormControl(),
      isPopular: new FormControl(),
      Chef: new FormControl(),
      SignatureDish: new FormControl(),
    });

    this.apiService.getChefs().subscribe((res) => {
      this.chefsArray = res;
      for (const key in this.chefsArray) {
        this.chefs.push({
          name: this.chefsArray[key].name,
          _id: this.chefsArray[key]._id,
        });
      }
      // console.log(this.chefs);
    });
    this.apiService.getDishes().subscribe((res) => {
      this.dishesArray = res;
      for (const key in this.dishesArray) {
        this.dishes.push({
          name: this.dishesArray[key].name,
          _id: this.dishesArray[key]._id,
          isActive: this.dishesArray[key].isActive,
        });
        // console.log(this.dishes);
      }
    });

    // console.log(this.teams)
    this.apiService.getRestaurants().subscribe((res) => {
      this.restaurantsArray = res;
      for (const key in this.restaurantsArray) {
        this.teams.push({
          name: this.restaurantsArray[key].name,
          image: this.restaurantsArray[key].image,
          isPopular: this.restaurantsArray[key].isPopular,
          Chef: this.restaurantsArray[key].Chef,
          SignatureDish: this.restaurantsArray[key].SignatureDish,
          _id: this.restaurantsArray[key]._id,
        });
      }
      this.dataSource = this.teams;
    });
  }

  addRestaurant() {
    this.chefs.forEach((chef: any) => {
      if (chef.name == this.restaurantModal.value.Chef) {
        this.restaurantModal.value.Chef = chef;
      }
    });
    this.dishes.forEach((dish: any) => {
      if (dish.name == this.restaurantModal.value.SignatureDish) {
        this.restaurantModal.value.SignatureDish = dish;
      }
    });
    debugger;
    this.apiService
      .addRestaurants(
        this.restaurantModal.value.name,
        this.restaurantModal.value.image,
        this.restaurantModal.value.isPopular,
        this.restaurantModal.value.Chef,
        this.isActive,
        this.restaurantModal.value.SignatureDish,
      )
      .subscribe((res: any) => {
        this.isAddRestaurantOpen = !this.isAddRestaurantOpen;
        this.toastService.success('Restaurant Added successfully!');
        this.apiService.getRestaurants().subscribe((res) => {
          this.dataSource = res;
        });
        console.log(res);
      });
  }
  openAddRestaurant() {
    this.restaurantModal.reset();
    this.isAddRestaurantOpen = !this.isAddRestaurantOpen;
  }
  openDeleteRestaurant(_id: string) {
    this.isDeleteRestaurantOpen = !this.isDeleteRestaurantOpen;
    this.selectedRestaurant = _id;
  }

  openEditRestaurant(row: any) {
    this.restaurantModal.patchValue(row);
    this.chefName.setValue(row.Chef.name);
    this.isEditRestaurantOpen = !this.isEditRestaurantOpen;
    this.selectedRestaurant = row._id;
  }
  editRestaurant() {
    this.chefs.forEach((chef: any) => {
      if (chef.name == this.restaurantModal.value.Chef) {
        debugger;
        this.restaurantModal.value.Chef = chef;
      }
    });

    this.dishes.forEach((dish: any) => {
      if (dish.name == this.restaurantModal.value.SignatureDish) {
        this.restaurantModal.value.SignatureDish = dish;
      }
    });
    let body: restaurantBodyReq = {
      name: this.restaurantModal.value.name,
      image: this.restaurantModal.value.image,
      isActive: this.isActive,
      Chef: this.restaurantModal.value.Chef._id,
      isPopular: this.restaurantModal.value.isPopular,
      SignatureDish: this.restaurantModal.value.SignatureDish.id,
    };

    this.apiService
      .editRestaurant(this.selectedRestaurant, body)
      .subscribe((res) => {
        this.toastService.success('Restaurant changed successfully!');
        this.apiService.getRestaurants().subscribe((res) => {
          this.dataSource = res;
        });
        this.apiService.getChefs().subscribe((res) => {
          this.chefs = res;
        });
        console.log(res);
      });
    this.isEditRestaurantOpen = false;
  }

  deleteRestaurant() {
    this.apiService
      .deleteRestaurant(this.selectedRestaurant, false)
      .subscribe((res) => {
        this.toastService.success('Restaurant has been deleted successfully!');
        this.apiService.getRestaurants().subscribe((res) => {
          this.dataSource = res;
        });
        console.log(res);
      });
    this.isDeleteRestaurantOpen = !this.isDeleteRestaurantOpen;
  }
}
