import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointment-page.component.html'
})
export class AppointmentPageComponent {
  onSubmit(event: Event): void {
    event.preventDefault();
    alert('Thank you for choosing Mostly Solution Limited! Your booking request has been sent. We will contact you shortly.');
  }
}
