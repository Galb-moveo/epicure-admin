import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';

export interface restaurantBodyReq {
  name: string;
  image: string;
  isPopular: boolean;
  Chef: any;
  isActive: boolean;
  SignatureDish:any;
}

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
})
export class RestaurantsComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  restaurantModal = new FormGroup({
    name: new FormControl(),
    image: new FormControl(),
    isPopular: new FormControl(),
    chefId: new FormControl(),
    signatureId: new FormControl()
  });
  title = 'Add Restaurant';
  // name: string = '';
  // image: string = '';
  // popular: boolean = false;
  // selectedChef: any;
  isActive: boolean = true;
  // Chef: any;
  selectedRestaurant: string = '';

  isAddRestaurantOpen: boolean = false;
  isEditRestaurantOpen: boolean = false;
  chefsArray: any = [];
  chefs: any = [];

  displayedColumns: string[] = [
    'name',
    'image',
    'popular',
    'chef',
    'edit',
    'delete',
  ];
  dataSource: any = [];
  restaurantsArray: any = [];
  dishesArray:any=[]
  dishes:any = [];

  teams: any = [];

  ngOnInit(): void {
    this.apiService.getChefs().subscribe((res) => {
      this.chefsArray = res;
      for (const key in this.chefsArray) {
        this.chefs.push({
          name: this.chefsArray[key].name,
          id: this.chefsArray[key]._id,
        });
        // console.log(this.chefs);
      }
    });
    this.apiService.getDishes().subscribe((res) => {
      this.dishesArray = res;
      for (const key in this.dishesArray) {
        this.dishes.push({
          name: this.dishesArray[key].name,
          id: this.dishesArray[key]._id,
        });
        // console.log(this.dishes);
      }
    });

    this.apiService.getRestaurants().subscribe((res) => {
      this.restaurantsArray = res;
      for (const key in this.restaurantsArray) {
        this.teams.push({
          name: this.restaurantsArray[key].name,
          image: this.restaurantsArray[key].image,
          popular: this.restaurantsArray[key].isPopular,
          chef: this.restaurantsArray[key].Chef,
          signatureDish:this.restaurantsArray[key].SignatureDish,
          id: this.restaurantsArray[key]._id,
        });
      }
      this.dataSource = this.teams;
    });
    // console.log(this.teams);
  }

  addRestaurant() {
    this.apiService
      .addRestaurants(
        this.restaurantModal.value.name,
        this.restaurantModal.value.image,
        this.restaurantModal.value.isPopular,
        this.restaurantModal.value.chefId,
        this.isActive,
        this.restaurantModal.value.signatureId,
      )
      .subscribe((res: any) => {
        this.isAddRestaurantOpen = !this.isAddRestaurantOpen;
        console.log(res);
      });
  }
  openAddRestaurant() {
    this.isAddRestaurantOpen = !this.isAddRestaurantOpen;
  }

  openEditRestaurant(id: string) {
    this.isEditRestaurantOpen = !this.isEditRestaurantOpen;
    this.selectedRestaurant = id;
  }

  editRestaurant() {
    let body: restaurantBodyReq = {
      name:this.restaurantModal.value.name,
      image: this.restaurantModal.value.image,
      isActive: this.isActive,
      Chef: this.restaurantModal.value.chefId,
      isPopular:  this.restaurantModal.value.isPopular,
      SignatureDish: this.restaurantModal.value.signatureId
    };
    this.apiService
      .editRestaurant(this.selectedRestaurant, body)
      .subscribe((res) => {
        console.log(res);
      });
    this.isEditRestaurantOpen = false;
  }

  deleteRestaurant(id: string) {
    this.apiService.deleteRestaurant(id, false).subscribe((res) => {
      console.log(res);
    });
  }
}
