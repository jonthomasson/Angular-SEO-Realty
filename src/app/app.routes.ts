import { Routes } from '@angular/router';
import { DetailComponent } from './feature/detail/detail.component';
import { HomeComponent } from './feature/home/home.component';
import { SearchComponent } from './feature/search/search.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: '**', redirectTo: 'home' },];
