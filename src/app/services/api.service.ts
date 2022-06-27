import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { chefBodyReq } from '../chefs/chefs.component';
import { dishBodyReq } from '../dishes/dishes.component';
import { restaurantBodyReq } from '../restaurants/restaurants.component';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  BASE_URL: string = 'http://localhost:3000/api';
  AUTH_URL: string = 'http://localhost:3000'

  //////Restaurant requests
  getRestaurants() {
    return this.http.get(`${this.BASE_URL}/restaurants`);
  }

  addRestaurants(
    name: string,
    image: string,
    isPopular: boolean,
    Chef: any,
    isActive:boolean,
    SignatureDish:any
  ) {
    return this.http.post(`${this.BASE_URL}/restaurants`, {
      name: name,
      image: image,
      isPopular: isPopular,
      Chef: Chef,
      isActive:isActive,
      SignatureDish:SignatureDish,
    });
  }
  editRestaurant(restId: string, body:restaurantBodyReq ) {
    return this.http.put(`${this.BASE_URL}/restaurants/${restId}`,{ 
      name: body.name,
      image:body.image,
      isPopular:body.isPopular,
      Chef:body.Chef,
      isActive:body.isActive
  });
  }

  deleteRestaurant(restId:string, isActive:boolean){
    return this.http.put(`${this.BASE_URL}/restaurants/${restId}`,{ 
      isActive:isActive,
  });
  }
  
  //////Dish requests
  getDishes() {
    return this.http.get(`${this.BASE_URL}/dishes`);
  }
  addDish(
    name: string,
    image: string,
    description: string,
    price: number,
    tags: any,
    Restaurant: any,
    isActive: boolean,
  ) {
    return this.http.post(`${this.BASE_URL}/dishes`, {
      name: name,
      image: image,
      description: description,
      price: price,
      tags: tags,
      Restaurant: Restaurant,
      isActive: isActive,
    });
  }

  editDish(dishId: string, body:dishBodyReq ) {
    return this.http.put(`${this.BASE_URL}/dishes/${dishId}`,{ 
      name: body.name,
      description:body.description,
      image:body.image,
      isActive:body.isActive,
      price:body.price,
      tags:body.tags,
      Restaurant:body.Restaurant
  });
  }

  deleteDish(dishId:string, isActive:boolean){
    return this.http.put(`${this.BASE_URL}/dishes/${dishId}`,{ 
      isActive:isActive,
  });
  }
  //////Chef requests

  getChefs() {
    return this.http.get(`${this.BASE_URL}/chefs`);
  }

  addChef(name: string, image: string, description: string, isActive: boolean) {
    return this.http.post(`${this.BASE_URL}/chefs`, {
      name: name,
      image: image,
      description: description,
      isActive: isActive,
    });
  }

  editChef(chefId: string, body:chefBodyReq ) {
    return this.http.put(`${this.BASE_URL}/chefs/${chefId}`,{ 
      name: body.name,
      description:body.description,
      image:body.image,
      isActive:body.isActive,
      chefId: chefId,
  });
  }

  deleteChef(chefId:string, isActive:boolean){
    return this.http.put(`${this.BASE_URL}/chefs/${chefId}`,{ 
      isActive:isActive,
  });
  }

  /////chefOFWek
  getChefOfWeek(){
    return this.http.get(`${this.BASE_URL}/chefOfWeek`);
  }

  editChefOfWeek(chefId: string, body:any ) {
    return this.http.put(`${this.BASE_URL}/chefOfWeek/${chefId}`,{ 
      Chef:body.chefOfId
  });
  }

  /////////Login
  login(email:string,password:string){
    return this.http.post(`${this.AUTH_URL}/signin`,{
      email: email,
      password: password
    });
  }
  register(email:string,password:string, name:string){
    return this.http.post(`${this.AUTH_URL}/signup`,{
      email: email,
      password: password,
      name:name
    });
  }
}
