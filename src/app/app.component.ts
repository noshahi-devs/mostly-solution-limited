import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mostly Solution website';
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    alert('Thank you for choosing Mostly Solution Limited! Your booking request has been sent. We will contact you shortly.');
  }
}
