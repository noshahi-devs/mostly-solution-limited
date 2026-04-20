import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { ServicesPageComponent } from './services-page.component';
import { LocationsPageComponent } from './locations-page.component';
import { SpecialtiesPageComponent } from './specialties-page.component';
import { AppointmentPageComponent } from './appointment-page.component';
import { GalleryPageComponent } from './gallery-page.component';
import { AboutPageComponent } from './about-page.component';
import { ContactPageComponent } from './contact-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'services', component: ServicesPageComponent },
  { path: 'locations', component: LocationsPageComponent },
  { path: 'specialties', component: SpecialtiesPageComponent },
  { path: 'appointment', component: AppointmentPageComponent },
  { path: 'gallery', component: GalleryPageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: '**', redirectTo: 'home' }
];
