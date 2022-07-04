import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from '../services/api.service';

export interface dishBodyReq {
  name: string;
  image: string;
  description: string;
  isActive: boolean;
  price: number;
  tags: any;
  Restaurant: any;
}

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss'],
})
export class DishesComponent implements OnInit {
  public tagsArray: any = [
    { name: 'spicy', value: 'https://svgshare.com/i/i45.svg' },
    { name: 'veg', value: 'https://epicure-gal.s3.amazonaws.com/veg.svg' },
    { name: 'vej', value: 'https://epicure-gal.s3.amazonaws.com/vej.svg' },
  ];
  tags = new FormGroup({
    isSpicy: new FormControl(false),
    isVegan: new FormControl(false),
    isVej: new FormControl(false),
  });
  dishModal = new FormGroup({});
  isEdit: boolean = false;

  onChange() {
    // console.log(this.tagsArray)
  }
  title = 'Add dish';
  isActive: boolean = true;
  isAddDishOpen: boolean = false;
  isEditDishOpen: boolean = false;
  isDeleteDishOpen: boolean = false;
  selectedDish: string = '';
  constructor(public apiService: ApiService, private fb: FormBuilder) {
    this.createFG();
  }
  createFG() {
    this.dishModal = this.fb.group({
      name: new FormControl(),
      image: new FormControl(),
      description: new FormControl(),
      price: new FormControl(),
      restaurantId: new FormControl(),
      dishModalTags: this.tags,
    });
  }

  displayedColumns = [
    'image',
    'name',
    'description',
    'price',
    // 'tags',
    'edit',
    'delete',
  ];
  dataSource: any = [];
  dishesArray: any = [];
  dishes: any = [];
  restArray: any = [];
  restaurants: any = [];

  ngOnInit(): void {
    this.apiService.getRestaurants().subscribe((res) => {
      this.restArray = res;
      for (const key in this.restArray) {
        this.restaurants.push({
          name: this.restArray[key].name,
          id: this.restArray[key]._id,
          isActive: this.restArray[key].isActive,
        });
      }
      // console.log(this.restaurants)
    });

    this.apiService.getDishes().subscribe((res) => {
      this.dishesArray = res;
      for (const key in this.dishesArray) {
        this.dishes.push({
          name: this.dishesArray[key].name,
          image: this.dishesArray[key].image,
          description: this.dishesArray[key].description,
          price: this.dishesArray[key].price,
          signature: this.dishesArray[key].SignatureDish,
          tag: this.dishesArray[key].tags,
          Restaurant: this.dishesArray[key],
          RestaurantActive: this.dishesArray[key].isActive,
          id: this.dishesArray[key]._id,
          isActive: this.dishesArray[key].isActive,
        });
      }
      this.dataSource = this.dishes;
    });
    console.log(this.dishes);
  }
  openAddDish() {
    this.dishModal.reset();
    this.isAddDishOpen = !this.isAddDishOpen;
  }
  openDeleteDish(id:string) {
    this.isDeleteDishOpen = !this.isDeleteDishOpen;
    this.selectedDish = id;
  }

  openEditDish(row: any) {
    this.dishModal.patchValue(row);
    this.isEdit = true;
    this.isEditDishOpen = !this.isEditDishOpen;
    this.selectedDish = row.id;
  }

  addDish() {
    let array = [];
    if (this.dishModal.value.dishModalTags.isSpicy) {
      array.push('https://svgshare.com/i/i45.svg');
    }
    if (this.dishModal.value.dishModalTags.isVegan) {
      array.push('https://svgshare.com/i/i45.svg');
    }
    if (this.dishModal.value.dishModalTags.isVej) {
      array.push('https://svgshare.com/i/i45.svg');
    }
    this.apiService
      .addDish(
        this.dishModal.value.name,
        this.dishModal.value.image,
        this.dishModal.value.description,
        this.dishModal.value.price,
        array,
        this.dishModal.value.restaurantId,
        this.isActive,
      )
      .subscribe((res) => {
        console.log(res);
      });
    this.isAddDishOpen = !this.isAddDishOpen;
  }

  editDish() {
    let body: dishBodyReq = {
      name: this.dishModal.value.name,
      image: this.dishModal.value.image,
      description: this.dishModal.value.description,
      isActive: this.isActive,
      price: this.dishModal.value.price,
      tags: this.dishModal.value.tags,
      Restaurant: this.dishModal.value.restaurantId,
    };
    this.apiService.editDish(this.selectedDish, body).subscribe((res) => {
      console.log(res);
    });
    this.isEditDishOpen = false;
  }

  deleteDish() {
    this.apiService.deleteDish(this.selectedDish, false).subscribe((res) => {
      // console.log(res);
    });
    this.isDeleteDishOpen = !this.isDeleteDishOpen;
  }
}
