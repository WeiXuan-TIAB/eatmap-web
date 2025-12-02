// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PlaceFormComponent } from './pages/place-form/place-form.component';
import { PlaceDetailComponent } from './pages/place-detail/place-detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'new',
    component: PlaceFormComponent,
  },
  {
    path: 'place/:id',
    component: PlaceDetailComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
