import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DishesComponent } from './dishes/dishes.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { ChefsComponent } from './chefs/chefs.component';
import { ChefOfWeekComponent } from './chef-of-week/chef-of-week.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AuthenticationGuard } from './authentication.guard';

const routes: Routes = [
  {path:'login', component:  LoginComponent},
  {
    path: '' ,component:NavigationComponent,canActivate:[AuthenticationGuard],
    children: [
      { path: 'chefs', component:  ChefsComponent, canActivate:[AuthenticationGuard]},
      { path: 'restaurants', component:  RestaurantsComponent, canActivate:[AuthenticationGuard]},
      { path: 'dishes', component: DishesComponent, canActivate:[AuthenticationGuard]},
      { path: 'chefOfWeek', component:  ChefOfWeekComponent, canActivate:[AuthenticationGuard]},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
