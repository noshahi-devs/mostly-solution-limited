import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-specialties-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './specialties-page.component.html'
})
export class SpecialtiesPageComponent {}

