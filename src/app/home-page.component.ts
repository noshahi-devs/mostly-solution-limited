import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('bookingCard') private bookingCard?: ElementRef<HTMLElement>;
  @ViewChild('bookingVideo') private bookingVideo?: ElementRef<HTMLVideoElement>;

  currentServiceIndex = 0;
  isBookingVideoActive = false;

  readonly heroSlides = [
    {
      title: "UK's #1 Mobile Car Repairing",
      subtitle: 'Highly Reliable & Professional',
      description:
        'Expert mechanical support at your doorstep. We bring the garage to you, anywhere in England with 24/7 elite standards.',
      image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=1600',
      tag: '24/7 UK Wide'
    },
    {
      title: 'On the Distance of a Phone Call',
      subtitle: 'Rapid Response Network',
      description:
        'Immediate roadside assistance across all UK regions. Just one call and our elite technicians are on their way to your location.',
      image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&q=80&w=1600',
      tag: 'Instant Support'
    },
    {
      title: 'Trusted Brand in England',
      subtitle: 'Elite Automotive Standards',
      description:
        'Experience the most reliable mobile car repair service in the UK. Certified, insured, and highly recommended by thousands of drivers.',
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=1600',
      tag: 'Top Rated'
    }
  ];

  readonly serviceCards = [
    {
      title: 'Bodywork & Paint',
      quote: 'Quote After Inspection',
      description: 'Panel repairs, dent and crack correction, bumper work, and paint preparation based on visible damage.',
      image: 'assets/service_engine_diagnostic_1776492556369.png',
      tag: 'Inspection-Based'
    },
    {
      title: 'Remap & Performance',
      quote: 'Vehicle-Specific Quote',
      description: 'ECU remap and performance setup guided by diagnostics, vehicle model, and safe tuning targets.',
      image: 'assets/Mostly%20Solutions%20Limited.png',
      tag: 'Diagnostics First'
    },
    {
      title: 'Detailing & Protection',
      quote: 'Condition-Based Quote',
      description: 'Valet, deep clean, paint correction, and restoration plans tailored to interior and paint condition.',
      image: 'assets/service_brake_repair_1776492609413.png',
      tag: 'Showroom Finish'
    },
    {
      title: 'Recovery Service 24/7',
      quote: 'Emergency Dispatch',
      description: 'Round-the-clock roadside recovery and safe vehicle transport support across London and Reading.',
      image: 'assets/fleet_maintenance.png',
      tag: 'Always Available'
    }
  ];

  readonly brandCards = [
    {
      name: 'Audi',
      image: 'https://images.unsplash.com/photo-1771979788169-a77b299c7d84?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXVkaSUyMGJyYW5kfGVufDB8fDB8fHww'
    },
    {
      name: 'Mercedes',
      image: 'https://images.unsplash.com/photo-1776966892405-84252c273e7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fE1lcmNlZGVzJTIwYnJhbmR8ZW58MHx8MHx8fDA%3D'
    },
    {
      name: 'Volkswagen',
      image: 'https://images.unsplash.com/photo-1657296402147-0a9295f8abd9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Vm9sa3N3YWdlbiUyMCU1Q2JyYW5kfGVufDB8fDB8fHww'
    },
    {
      name: 'Seat',
      image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&q=80&w=900'
    },
    {
      name: 'Vauxhall',
      image: 'https://images.unsplash.com/photo-1703098916487-ab6668147d50?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D'
    },
    {
      name: 'Citroen',
      image: 'https://images.unsplash.com/photo-1703035942278-ff6061781814?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8'
    },
    {
      name: 'Ford',
      image: 'https://images.unsplash.com/photo-1763596554036-b4503f3d53ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGZvcmQlMjBicmFuZHxlbnwwfHwwfHx8MA%3D%3D'
    },
    {
      name: 'Toyota',
      image: 'https://images.unsplash.com/photo-1613859492095-85d9944f09f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fFRveW90YSUyMGNhciUyMGJyYW5kfGVufDB8fDB8fHww'
    },
    {
      name: 'Honda',
      image: 'https://images.unsplash.com/photo-1578659258511-4a4e7dee7344?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SG9uZGElMjBjYXIlMjBicmFuZHxlbnwwfHwwfHx8MA%3D%3D'
    },
    {
      name: 'Nissan',
      image: 'https://images.unsplash.com/photo-1712152775803-35a8f6937663?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bmlzc2FuJTIwY2FyJTIwYnJhbmR8ZW58MHx8MHx8fDA%3D'
    }
  ];

  private serviceCarouselTimerId?: ReturnType<typeof setInterval>;
  private navSub?: Subscription;
  private bookingViewportObserver?: IntersectionObserver;
  private bookingVideoTimerId?: ReturnType<typeof setTimeout>;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.startServiceCarousel();
    this.navSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.scrollByRoute());
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.scrollByRoute(), 0);
    this.setupBookingViewportAutoplay();
  }

  ngOnDestroy(): void {
    if (this.serviceCarouselTimerId) {
      clearInterval(this.serviceCarouselTimerId);
    }
    this.bookingViewportObserver?.disconnect();
    if (this.bookingVideoTimerId) {
      clearTimeout(this.bookingVideoTimerId);
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
    this.isBookingVideoActive = true;
    video.currentTime = 0;
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {});
    }
  }

  resetBookingVideo(video: HTMLVideoElement): void {
    this.isBookingVideoActive = false;
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

  private setupBookingViewportAutoplay(): void {
    if (typeof IntersectionObserver === 'undefined' || !this.bookingCard || !this.bookingVideo) {
      return;
    }

    this.bookingViewportObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!this.isMobileViewport()) {
            return;
          }

          if (entry.isIntersecting) {
            if (this.bookingVideoTimerId) {
              clearTimeout(this.bookingVideoTimerId);
            }

            this.bookingVideoTimerId = setTimeout(() => {
              const video = this.bookingVideo?.nativeElement;
              if (!video) {
                return;
              }

              this.playBookingVideo(video);
            }, 2000);
            return;
          }

          if (this.bookingVideoTimerId) {
            clearTimeout(this.bookingVideoTimerId);
            this.bookingVideoTimerId = undefined;
          }

          const video = this.bookingVideo?.nativeElement;
          if (video) {
            this.resetBookingVideo(video);
          }
        });
      },
      { threshold: 0.6 }
    );

    this.bookingViewportObserver.observe(this.bookingCard.nativeElement);
  }

  private isMobileViewport(): boolean {
    return window.matchMedia('(max-width: 1024px)').matches;
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

