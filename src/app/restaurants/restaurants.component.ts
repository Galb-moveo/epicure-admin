import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface restaurantBodyReq {
  name: string;
  image: string;
  popular: boolean;
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
  constructor(private apiService: ApiService, private fb: FormBuilder) {}

  teams: any = [];
  dataSource:any = [];

  title = 'Add Restaurant';
  isActive: boolean = true;
  selectedRestaurant: string = '';

  isAddRestaurantOpen: boolean = false;
  isEditRestaurantOpen: boolean = false;
  isDeleteRestaurantOpen: boolean = false;
  chefsArray: any = [];
  chefs: any = [];
  token: any = localStorage.getItem('token');

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
      popular: new FormControl(),
      chef: new FormControl(),
      signatureDish: new FormControl(),
    });

    this.apiService.getChefs().subscribe((res) => {
      this.chefsArray = res;
      for (const key in this.chefsArray) {
        this.chefs.push({
          name: this.chefsArray[key].name,
          id: this.chefsArray[key]._id,
        });
      }
      // console.log(this.chefs);
    });
    this.apiService.getDishes().subscribe((res) => {
      this.dishesArray = res;
      for (const key in this.dishesArray) {
        this.dishes.push({
          name: this.dishesArray[key].name,
          id: this.dishesArray[key]._id,
          isActive: this.dishesArray[key].isActive,
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
          signatureDish: this.restaurantsArray[key].SignatureDish,
          // dishActive: this.restaurantsArray[key].signatureDish.isActive,
          id: this.restaurantsArray[key]._id,
        });
      }
      this.dataSource = this.teams;
    });
    console.log(this.teams);
  }

  addRestaurant() {
    this.apiService
      .addRestaurants(
        this.restaurantModal.value.name,
        this.restaurantModal.value.image,
        this.restaurantModal.value.popular,
        this.restaurantModal.value.chef,
        this.isActive,
        this.restaurantModal.value.signatureDish,
      )
      .subscribe((res: any) => {
        this.isAddRestaurantOpen = !this.isAddRestaurantOpen;
        console.log(res);
      });
  }
  openAddRestaurant() {
    this.restaurantModal.reset();
    this.isAddRestaurantOpen = !this.isAddRestaurantOpen;
  }
  openDeleteRestaurant(id:string) {
    this.isDeleteRestaurantOpen = !this.isDeleteRestaurantOpen;
    this.selectedRestaurant = id;
  }

  openEditRestaurant(row: any) {
    this.restaurantModal.patchValue(row);  
    this.isEditRestaurantOpen = !this.isEditRestaurantOpen;
    this.selectedRestaurant = row.id;
  }
  editRestaurant() {
    let body: restaurantBodyReq = {
      name:this.restaurantModal.value.name,
      image: this.restaurantModal.value.image,
      isActive: this.isActive,
      Chef: this.restaurantModal.value.chefId,
      popular:  this.restaurantModal.value.popular,
      SignatureDish: this.restaurantModal.value.signatureId
    };
    this.apiService
      .editRestaurant(this.selectedRestaurant, body)
      .subscribe((res) => {
        console.log(res);
      });
    this.isEditRestaurantOpen = false;
  }

  deleteRestaurant() {
    this.apiService.deleteRestaurant(this.selectedRestaurant, false).subscribe((res) => {
      console.log(res);
    });
    this.isDeleteRestaurantOpen = !this.isDeleteRestaurantOpen;
  }
}
