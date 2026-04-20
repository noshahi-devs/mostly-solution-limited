import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Mostly Solutions Limited Website';
  menuOpen = false;
  currentServiceIndex = 0;
  
  // High-impact brand slides for the Hero section
  readonly heroSlides = [
    {
      title: 'UK’s #1 Mobile Car Repairing',
      subtitle: 'Highly Reliable & Professional',
      description: 'Expert mechanical support at your doorstep. We bring the garage to you, anywhere in England with 24/7 elite standards.',
      price: 'Starting from £45',
      image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=1600',
      tag: '24/7 UK Wide'
    },
    {
      title: 'On the Distance of a Phone Call',
      subtitle: 'Rapid Response Network',
      description: 'Immediate roadside assistance across all UK regions. Just one call and our elite technicians are on their way to your location.',
      price: 'Emergency: £85',
      image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&q=80&w=1600',
      tag: 'Instant Support'
    },
    {
      title: 'Trusted Brand in England',
      subtitle: 'Elite Automotive Standards',
      description: 'Experience the most reliable mobile car repair service in the UK. Certified, insured, and highly recommended by thousands of drivers.',
      price: 'Plans from £120',
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=1600',
      tag: 'Top Rated'
    }
  ];

  // Detailed services for the grid section
  readonly serviceCards = [
    {
      title: 'Mobile Mechanic',
      price: 'From £45',
      description: '24/7 immediate support with rapid response and repair at any location in the UK.',
      image: 'assets/service_engine_diagnostic_1776492556369.png',
      tag: 'Certified Technicians'
    },
    {
      title: 'Vehicle Inspections',
      price: 'From £85',
      description: 'Pre-purchase and diagnostic checks to ensure vehicle readiness and safety.',
      image: 'assets/Mostly%20Solutions%20Limited.png',
      tag: 'Detailed Reports'
    },
    {
      title: 'Repair Services',
      price: 'From £65',
      description: 'Minor and major repairs for all vehicle brands using genuine parts.',
      image: 'assets/service_brake_repair_1776492609413.png',
      tag: 'Expert Fixes'
    },
    {
      title: 'Annual Maintenance',
      price: 'From £120',
      description: 'Routine maintenance including oil, brakes, filters and full diagnostic scans.',
      image: 'assets/fleet_maintenance.png',
      tag: 'Elite Care'
    }
  ];

  private serviceCarouselTimerId?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.startServiceCarousel();
  }

  ngOnDestroy(): void {
    if (this.serviceCarouselTimerId) {
      clearInterval(this.serviceCarouselTimerId);
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    alert('Thank you for choosing Mostly Solution Limited! Your booking request has been sent. We will contact you shortly.');
  }

  scrollToAppointment(location: string) {
    const element = document.getElementById('appointment');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  nextServiceCard(): void {
    this.currentServiceIndex = (this.currentServiceIndex + 1) % this.heroSlides.length;
  }

  prevServiceCard(): void {
    this.currentServiceIndex = (this.currentServiceIndex - 1 + this.heroSlides.length) % this.heroSlides.length;
  }

  setServiceCard(index: number): void {
    this.currentServiceIndex = index;
  }

  private startServiceCarousel(): void {
    this.serviceCarouselTimerId = setInterval(() => this.nextServiceCard(), 5000);
  }
}
