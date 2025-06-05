import { Routes } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { MeditationComponent } from './view/meditation/meditation.component';
import { MyPeriodComponent } from './view/my-period/my-period.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'meditation', component: MeditationComponent },
  { path: 'myPeriod', component: MyPeriodComponent },
];
