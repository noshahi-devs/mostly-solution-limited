import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit, AfterViewInit, OnDestroy {
  currentServiceIndex = 0;

  readonly heroSlides = [
    {
      title: 'UKâ€™s #1 Mobile Car Repairing',
      subtitle: 'Highly Reliable & Professional',
      description:
        'Expert mechanical support at your doorstep. We bring the garage to you, anywhere in England with 24/7 elite standards.',
      price: 'Starting from Â£45',
      image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=1600',
      tag: '24/7 UK Wide'
    },
    {
      title: 'On the Distance of a Phone Call',
      subtitle: 'Rapid Response Network',
      description:
        'Immediate roadside assistance across all UK regions. Just one call and our elite technicians are on their way to your location.',
      price: 'Emergency: Â£85',
      image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&q=80&w=1600',
      tag: 'Instant Support'
    },
    {
      title: 'Trusted Brand in England',
      subtitle: 'Elite Automotive Standards',
      description:
        'Experience the most reliable mobile car repair service in the UK. Certified, insured, and highly recommended by thousands of drivers.',
      price: 'Plans from Â£120',
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=1600',
      tag: 'Top Rated'
    }
  ];

  readonly serviceCards = [
    {
      title: 'Mobile Mechanic',
      price: 'From Â£45',
      description: '24/7 immediate support with rapid response and repair at any location in the UK.',
      image: 'assets/service_engine_diagnostic_1776492556369.png',
      tag: 'Certified Technicians'
    },
    {
      title: 'Vehicle Inspections',
      price: 'From Â£85',
      description: 'Pre-purchase and diagnostic checks to ensure vehicle readiness and safety.',
      image: 'assets/Mostly%20Solutions%20Limited.png',
      tag: 'Detailed Reports'
    },
    {
      title: 'Repair Services',
      price: 'From Â£65',
      description: 'Minor and major repairs for all vehicle brands using genuine parts.',
      image: 'assets/service_brake_repair_1776492609413.png',
      tag: 'Expert Fixes'
    },
    {
      title: 'Annual Maintenance',
      price: 'From Â£120',
      description: 'Routine maintenance including oil, brakes, filters and full diagnostic scans.',
      image: 'assets/fleet_maintenance.png',
      tag: 'Elite Care'
    }
  ];

  private serviceCarouselTimerId?: ReturnType<typeof setInterval>;
  private navSub?: Subscription;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.startServiceCarousel();
    this.navSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.scrollByRoute());
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.scrollByRoute(), 0);
  }

  ngOnDestroy(): void {
    if (this.serviceCarouselTimerId) {
      clearInterval(this.serviceCarouselTimerId);
    }
    this.navSub?.unsubscribe();
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    alert('Thank you for choosing Mostly Solution Limited! Your booking request has been sent. We will contact you shortly.');
  }

  scrollToAppointment(_location?: string): void {
    const element = document.getElementById('appointment');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  playBookingVideo(video: HTMLVideoElement): void {
    video.currentTime = 0;
    void video.play();
  }

  resetBookingVideo(video: HTMLVideoElement): void {
    video.pause();
    video.currentTime = 0;
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

  private scrollByRoute(): void {
    const path = this.router.url.split('?')[0].replace(/^\//, '');
    const targetByRoute: Record<string, string> = {
      '': 'home',
      home: 'home',
      services: 'services',
      locations: 'locations',
      specialties: 'value-added',
      appointment: 'appointment'
    };

    const targetId = targetByRoute[path] ?? 'home';
    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
