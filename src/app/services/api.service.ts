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
  AUTH_URL: string = 'http://localhost:3000';

  //////Restaurant requests
  getRestaurants() {
    return this.http.get(`${this.BASE_URL}/restaurants`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  addRestaurants(
    name: string,
    image: string,
    isPopular: boolean,
    Chef: any,
    isActive: boolean,
    SignatureDish: any,
  ) {
    return this.http.post(
      `${this.BASE_URL}/restaurants`,
      {
        name: name,
        image: image,
        isPopular: isPopular,
        Chef: Chef,
        isActive: isActive,
        SignatureDish: SignatureDish,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
  }
  editRestaurant(restId: string, body: restaurantBodyReq) {
    return this.http.put(
      `${this.BASE_URL}/restaurants/${restId}`,
      {
        name: body.name,
        image: body.image,
        isPopular: body.isPopular,
        Chef: body.Chef,
        isActive: body.isActive,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
  }

  deleteRestaurant(restId: string, isActive: boolean) {
    return this.http.put(
      `${this.BASE_URL}/restaurants/${restId}`,
      {
        isActive: isActive,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
  }

  //////Dish requests
  getDishes() {
    return this.http.get(`${this.BASE_URL}/dishes`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
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
    return this.http.post(
      `${this.BASE_URL}/dishes`,
      {
        name: name,
        image: image,
        description: description,
        price: price,
        tags: tags,
        Restaurant: Restaurant,
        isActive: isActive,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
  }

  editDish(dishId: string, body: dishBodyReq) {
    return this.http.put(
      `${this.BASE_URL}/dishes/${dishId}`,
      {
        name: body.name,
        description: body.description,
        image: body.image,
        isActive: body.isActive,
        price: body.price,
        tags: body.tags,
        Restaurant: body.Restaurant,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
  }

  deleteDish(dishId: string, isActive: boolean) {
    return this.http.put(
      `${this.BASE_URL}/dishes/${dishId}`,
      {
        isActive: isActive,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
  }
  //////Chef requests

  getChefs() {
    return this.http.get(`${this.BASE_URL}/chefs`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  addChef(name: string, image: string, description: string, isActive: boolean) {
    return this.http.post(
      `${this.BASE_URL}/chefs`,
      {
        name: name,
        image: image,
        description: description,
        isActive: isActive,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
  }

  editChef(chefId: string, body: chefBodyReq) {
    return this.http.put(
      `${this.BASE_URL}/chefs/${chefId}`,
      {
        name: body.name,
        description: body.description,
        image: body.image,
        isActive: body.isActive,
        chefId: chefId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
  }

  deleteChef(chefId: string, isActive: boolean) {
    return this.http.put(
      `${this.BASE_URL}/chefs/${chefId}`,
      {
        isActive: isActive,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
  }

  /////chefOFWek
  getChefOfWeek() {
    return this.http.get(`${this.BASE_URL}/chefOfWeek`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  editChefOfWeek(chefId: string, body: any) {
    return this.http.put(
      `${this.BASE_URL}/chefOfWeek/${chefId}`,
      {
        Chef: body.chefOfId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
  }

  /////////Login
  login(email: string, password: string) {
    return this.http.post(`${this.AUTH_URL}/signin`, {
      email: email,
      password: password,
    });
  }

  register(email: string, password: string, name: string) {
    return this.http.post(`${this.AUTH_URL}/signup`, {
      email: email,
      password: password,
      name: name,
    });
  }
}
