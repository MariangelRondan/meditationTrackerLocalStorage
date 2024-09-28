import { Routes } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { HomeScreenAnimationComponent } from './view/home-screen-animation/home-screen-animation.component';

export const routes: Routes = [
  { path: '', component: HomeScreenAnimationComponent },
  { path: 'home', component: HomeComponent },
];
