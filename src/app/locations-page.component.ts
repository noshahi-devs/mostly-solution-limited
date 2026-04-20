import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-locations-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './locations-page.component.html'
})
export class LocationsPageComponent {}

