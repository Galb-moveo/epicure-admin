import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { take } from 'rxjs';
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
    { name: 'https://svgshare.com/i/i45.svg', value: 'spicy' },
    { name: 'https://epicure-gal.s3.amazonaws.com/veg.svg', value: 'veg' },
    { name: 'https://epicure-gal.s3.amazonaws.com/vej.svg', value: 'vej' },
  ];

  isSpicy: FormControl = new FormControl(false);
  isVegan: FormControl = new FormControl(false);
  isVej: FormControl = new FormControl(false);

  dishModal = new FormGroup({});
  isEdit: boolean = false;

  title = 'Add dish';
  isActive: boolean = true;
  isAddDishOpen: boolean = false;
  isEditDishOpen: boolean = false;
  isDeleteDishOpen: boolean = false;
  selectedDish: string = '';
  constructor(
    public apiService: ApiService,
    private fb: FormBuilder,
    private toastService: HotToastService,
    private changeDetectorRefs: ChangeDetectorRef,
  ) {
    this.createFG();
  }
  createFG() {
    this.dishModal = this.fb.group({
      name:['',[Validators.minLength(2),Validators.required]],
      image: ['',Validators.required],
      description: ['',[Validators.required, Validators.minLength(4)]],
      price: ['',Validators.required],
      restaurantId: [Validators.required],
      isSpicy: this.isSpicy,
      isVegan: this.isVegan,
      isVej: this.isVej,
    });
  }

  displayedColumns = [
    'image',
    'name',
    'description',
    'price',
    'tags',
    'edit',
    'delete',
  ];
  //dataSource: any = [];
  dishesArray: any = [];
  dishes: any = [];
  restArray: any = [];
  restaurants: any = [];
  test: any = [];

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
        this.test.push({
          name: this.dishesArray[key].name,
          image: this.dishesArray[key].image,
          description: this.dishesArray[key].description,
          price: this.dishesArray[key].price,
          // signature: this.dishesArray[key].SignatureDish,
          tags: this.dishesArray[key].tags,
          Restaurant: this.dishesArray[key],
          RestaurantActive: this.dishesArray[key].isActive,
          _id: this.dishesArray[key]._id,
          isActive: this.dishesArray[key].isActive,
        });
      }
      this.dishes = this.test;
    });
  }
  openAddDish() {
    this.dishModal.reset();
    this.isAddDishOpen = !this.isAddDishOpen;
  }
  openDeleteDish(id: string) {
    this.isDeleteDishOpen = !this.isDeleteDishOpen;
    this.selectedDish = id;
  }

  openEditDish(row: any) {
    this.isSpicy.setValue(false);
    this.isVegan.setValue(false);
    this.isVej.setValue(false);

    this.tagsArray.forEach((tag: any) => {
      row.tags.map((tagItem: any) => {
        if (tag.name == tagItem) {
          if (tag.value == 'spicy') {
            this.isSpicy.setValue(true);
          } else if (tag.value == 'veg') {
            this.isVegan.setValue(true);
          } else if (tag.value == 'vej') {
            this.isVej.setValue(true);
          }
        }
      });
    });
    this.dishModal.value.isSpicy = this.isSpicy.value;
    this.dishModal.value.isVegan = this.isVegan.value;
    this.dishModal.value.isVej = this.isVej.value;
    this.dishModal.patchValue(row);
    this.isEdit = true;
    this.isEditDishOpen = !this.isEditDishOpen;
    this.selectedDish = row._id;
  }
  addDish() {
    let array = [];
    if (this.dishModal.value.isSpicy) {
      array.push('https://svgshare.com/i/i45.svg');
    }
    if (this.dishModal.value.isVegan) {
      array.push('https://epicure-gal.s3.amazonaws.com/veg.svg');
    }
    if (this.dishModal.value.isVej) {
      array.push('https://epicure-gal.s3.amazonaws.com/vej.svg');
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
        this.toastService.success('Dish Added successfully!');
        this.apiService.getDishes().subscribe((res) => {
          this.dishes = res;
        });
        console.log(res);
      });
    this.isAddDishOpen = !this.isAddDishOpen;
  }

  editDish() {
    let array = [];
    if (this.dishModal.value.isSpicy) {
      array.push('https://svgshare.com/i/i45.svg');
    }
    if (this.dishModal.value.isVegan) {
      array.push('https://epicure-gal.s3.amazonaws.com/veg.svg');
    }
    if (this.dishModal.value.isVej) {
      array.push('https://epicure-gal.s3.amazonaws.com/vej.svg');
    }
    let body: dishBodyReq = {
      name: this.dishModal.value.name,
      image: this.dishModal.value.image,
      description: this.dishModal.value.description,
      isActive: this.isActive,
      price: this.dishModal.value.price,
      tags: array,
      Restaurant: this.dishModal.value.restaurantId,
    };
    this.apiService.editDish(this.selectedDish, body).subscribe((res) => {
      this.apiService.getDishes().subscribe((res) => {
        //this.dataSource = res;
        this.dishes = res;
      });
      this.toastService.success('Dish changed successfully!');
      console.log(res);
    });
    this.isEditDishOpen = false;
    //this.dataSource = this.dishes
  }

  deleteDish() {
    this.apiService.deleteDish(this.selectedDish, false).subscribe((res) => {
      this.toastService.success('Dish has been deleted successfully!');
      this.apiService.getDishes().subscribe((res) => {
        this.dishes = res;
      });
    });
    this.isDeleteDishOpen = !this.isDeleteDishOpen;
  }
}
