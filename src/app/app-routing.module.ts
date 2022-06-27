import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DishesComponent } from './dishes/dishes.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { ChefsComponent } from './chefs/chefs.component';
import { ChefOfWeekComponent } from './chef-of-week/chef-of-week.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'chefs', component:  ChefsComponent},
      { path: 'restaurants', component:  RestaurantsComponent},
      { path: 'dishes', component: DishesComponent },
      { path: 'chefOfWeek', component:  ChefOfWeekComponent},
    ],
  },
  {path:'login', component:  LoginComponent},
  {path:'register', component:  RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
