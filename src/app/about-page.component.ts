import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface AboutCard {
  title: string;
  text: string;
  icon: string;
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  skills: string[];
}

interface VideoCard {
  title: string;
  subtitle: string;
  thumbnail: string;
  video: string;
}

interface StatItem {
  label: string;
  target: number;
  suffix: string;
}

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about-page.component.html'
})
export class AboutPageComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('hoverVideo') private hoverVideos?: QueryList<ElementRef<HTMLVideoElement>>;

  autoPlayingVideoIndexes = new Set<number>();
  autoPlayingProcessIndexes = new Set<number>();
  lightboxOpen = false;
  lightboxImage = '';
  lightboxTitle = '';

  private revealObserver: IntersectionObserver | null = null;
  private statsObserver: IntersectionObserver | null = null;
  private videoViewportObserver: IntersectionObserver | null = null;
  private videoAutoPlayTimers = new Map<number, ReturnType<typeof setTimeout>>();
  private processViewportObserver: IntersectionObserver | null = null;
  private processAutoPlayTimers = new Map<number, ReturnType<typeof setTimeout>>();
  private countersStarted = false;

  readonly missionCards: AboutCard[] = [
    {
      title: 'Our Mission',
      text: 'Deliver reliable mobile mechanic support with transparent diagnostics, fair pricing, and safety-first standards.',
      icon: 'M12 2l3 6.5L22 10l-5 4.8L18.2 22 12 18.8 5.8 22 7 14.8 2 10l7-1.5L12 2z'
    },
    {
      title: 'Our Vision',
      text: 'Become the most trusted on-site automotive service brand through speed, professionalism, and consistency.',
      icon: 'M12 3c-5.3 0-9.7 3.2-11 8.5C2.3 16.8 6.7 20 12 20s9.7-3.2 11-8.5C21.7 6.2 17.3 3 12 3zm0 4.2a4.3 4.3 0 110 8.6 4.3 4.3 0 010-8.6z'
    },
    {
      title: 'Our Goal',
      text: 'Keep every customer road-ready with rapid dispatch, certified technicians, and dependable long-term care.',
      icon: 'M3 12l4-4 4 4m-4-4v12M21 12l-4-4-4 4m4-4v12'
    }
  ];

  readonly whyChooseUs: AboutCard[] = [
    {
      title: 'Fast Service',
      text: 'Quick call handling and rapid dispatch across service zones.',
      icon: 'M13 2L3 14h7l-1 8 10-12h-7l1-8z'
    },
    {
      title: 'Expert Mechanics',
      text: 'Skilled, certified team experienced in all major vehicle types.',
      icon: 'M21 7.5l-1.5-1.5-3.8 3.8 1.5 1.5L21 7.5zM14 10l-9.5 9.5a2.1 2.1 0 003 3L17 13'
    },
    {
      title: 'On-Site Repair',
      text: 'Home, office, and roadside service where you need us most.',
      icon: 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1116 0zM12 10a3 3 0 100-6 3 3 0 000 6z'
    },
    {
      title: 'Affordable Pricing',
      text: 'Clear quotations and value-driven service without hidden costs.',
      icon: 'M12 2v20M17 6.5A4.5 4.5 0 0012 4a4.5 4.5 0 000 9 4.5 4.5 0 010 9 4.5 4.5 0 01-5-2.5'
    },
    {
      title: 'Advanced Tools',
      text: 'Modern diagnostics and professional equipment for accurate work.',
      icon: 'M6 3h12v4H6zM8 7v14h8V7'
    },
    {
      title: '24/7 Support',
      text: 'Always-on support team for urgent and scheduled requirements.',
      icon: 'M12 6v6l4 2M22 12a10 10 0 11-20 0 10 10 0 0120 0z'
    }
  ];

  readonly processSteps: AboutCard[] = [
    {
      title: 'Book Service',
      text: 'Call, WhatsApp, or submit your request online in minutes.',
      icon: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z'
    },
    {
      title: 'Mechanic Assigned',
      text: 'Nearest specialist is assigned with ETA and service details.',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM4 21a8 8 0 0116 0'
    },
    {
      title: 'On-Site Repair',
      text: 'We arrive, diagnose, and complete service at your location.',
      icon: 'M14 7.5l-8.5 8.5L3 13.5m18-7-8.5 8.5'
    }
  ];

  readonly teamMembers: TeamMember[] = [
    {
      name: 'James Cooper',
      role: 'Lead Mobile Technician',
      image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=1200',
      bio: 'Engine diagnostics, emergency faults, and high-performance repair support.',
      skills: ['Engine Diagnostics', 'ECU Scanning', 'Performance Tuning']
    },
    {
      name: 'Aamir Khan',
      role: 'Roadside Response Engineer',
      image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=1200',
      bio: 'Rapid on-site breakdown service with dependable first-visit resolution.',
      skills: ['Battery & Jumpstart', 'Breakdown Recovery', 'Quick Fault Fix']
    },
    {
      name: 'Daniel Wright',
      role: 'Inspection Specialist',
      image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&q=80&w=1200',
      bio: 'Pre-purchase and full-condition inspection reporting for confident decisions.',
      skills: ['Pre-Purchase Checks', 'Safety Reports', 'Condition Audits']
    }
  ];

  readonly videoCards: VideoCard[] = [
    {
      title: 'Engine Repair Session',
      subtitle: 'Precision diagnostics and repair execution',
      thumbnail: 'assets/service_engine_diagnostic_1776492556369.png',
      video: 'assets/hero-bg.mp4'
    },
    {
      title: 'Tools In Action',
      subtitle: 'Professional equipment and calibrated workflow',
      thumbnail: 'assets/service_brake_repair_1776492609413.png',
      video: 'https://media.istockphoto.com/id/2188378400/video/modern-generic-electric-vehicle-chassis-with-a-wireframe-body-displaying-all-components.mp4?s=mp4-480x480-is&k=20&c=QoWypI9Cgxxr1q-8x6Bi4bOiDvpE_e42Apj4uUZW0Vk='
    },
    {
      title: 'On-Site Support',
      subtitle: 'Roadside and doorstep mechanic assistance',
      thumbnail: 'https://media.istockphoto.com/id/2188413104/video/futuristic-electric-vehicle-with-exposed-internal-components-and-a-visible-electric-battery.avif?s=640x640&k=20&c=Hj1stjaCJrTJlwStLJ32VZOaCo3_P7-IccLW0sVr3n0=',
      video: 'assets/hero-bg.mp4'
    }
  ];

  readonly stats: StatItem[] = [
    { label: 'Cars Repaired', target: 500, suffix: '+' },
    { label: 'Happy Clients', target: 100, suffix: '+' },
    { label: 'Support Availability', target: 24, suffix: '/7' }
  ];

  statValues: number[] = [0, 0, 0];

  ngAfterViewInit(): void {
    this.setupRevealObserver();
    this.observeRevealElements();
    this.setupStatsObserver();
    this.setupVideoViewportAutoPlay();
    this.setupProcessViewportAutoPlay();
  }

  ngOnDestroy(): void {
    this.revealObserver?.disconnect();
    this.statsObserver?.disconnect();
    this.videoViewportObserver?.disconnect();
    this.videoAutoPlayTimers.forEach((timer) => clearTimeout(timer));
    this.videoAutoPlayTimers.clear();
    this.processViewportObserver?.disconnect();
    this.processAutoPlayTimers.forEach((timer) => clearTimeout(timer));
    this.processAutoPlayTimers.clear();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeLightbox();
  }

  openLightbox(image: string, title: string): void {
    this.lightboxImage = image;
    this.lightboxTitle = title;
    this.lightboxOpen = true;
  }

  closeLightbox(): void {
    this.lightboxOpen = false;
  }

  playHoverVideo(video: HTMLVideoElement): void {
    if (!video) {
      return;
    }

    video.muted = true;
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {});
    }
  }

  pauseHoverVideo(video: HTMLVideoElement): void {
    if (!video) {
      return;
    }

    video.pause();
    video.currentTime = 0;
  }

  private setupRevealObserver(): void {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    this.revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.revealObserver?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );
  }

  private observeRevealElements(): void {
    if (!this.revealObserver) {
      return;
    }

    document.querySelectorAll('.reveal').forEach((el) => this.revealObserver?.observe(el));
  }

  private setupStatsObserver(): void {
    if (typeof IntersectionObserver === 'undefined') {
      this.startCounters();
      return;
    }

    const statsSection = document.getElementById('about-stats');
    if (!statsSection) {
      return;
    }

    this.statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.countersStarted) {
            this.startCounters();
            this.countersStarted = true;
            this.statsObserver?.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    this.statsObserver.observe(statsSection);
  }

  private startCounters(): void {
    this.stats.forEach((stat, index) => {
      const duration = 1500;
      const stepTime = 16;
      const totalSteps = duration / stepTime;
      const increment = stat.target / totalSteps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.target) {
          this.statValues[index] = stat.target;
          clearInterval(timer);
        } else {
          this.statValues[index] = Math.floor(current);
        }
      }, stepTime);
    });
  }

  private setupVideoViewportAutoPlay(): void {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    this.videoViewportObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const indexText = (entry.target as HTMLElement).dataset['videoIndex'];
          const index = Number(indexText);
          if (Number.isNaN(index) || !this.isMobileViewport()) {
            return;
          }

          if (entry.isIntersecting) {
            if (this.videoAutoPlayTimers.has(index) || this.autoPlayingVideoIndexes.has(index)) {
              return;
            }

            const timer = setTimeout(() => {
              this.videoAutoPlayTimers.delete(index);
              this.startViewportVideo(index);
            }, 3000);
            this.videoAutoPlayTimers.set(index, timer);
            return;
          }

          const timer = this.videoAutoPlayTimers.get(index);
          if (timer) {
            clearTimeout(timer);
            this.videoAutoPlayTimers.delete(index);
          }
          this.stopViewportVideo(index);
        });
      },
      { threshold: 0.55 }
    );

    document.querySelectorAll('.video-hover-card').forEach((el) => this.videoViewportObserver?.observe(el));
  }

  private startViewportVideo(index: number): void {
    const video = this.hoverVideos?.toArray()[index]?.nativeElement;
    if (!video) {
      return;
    }

    video.muted = true;
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {});
    }
    this.autoPlayingVideoIndexes.add(index);
  }

  private stopViewportVideo(index: number): void {
    if (!this.autoPlayingVideoIndexes.has(index)) {
      return;
    }

    const video = this.hoverVideos?.toArray()[index]?.nativeElement;
    if (!video) {
      return;
    }

    video.pause();
    video.currentTime = 0;
    this.autoPlayingVideoIndexes.delete(index);
  }

  private isMobileViewport(): boolean {
    return window.matchMedia('(max-width: 1024px)').matches;
  }

  private setupProcessViewportAutoPlay(): void {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    this.processViewportObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const indexText = (entry.target as HTMLElement).dataset['processIndex'];
          const index = Number(indexText);
          if (Number.isNaN(index) || !this.isMobileViewport()) {
            return;
          }

          if (entry.isIntersecting) {
            if (this.processAutoPlayTimers.has(index) || this.autoPlayingProcessIndexes.has(index)) {
              return;
            }

            const timer = setTimeout(() => {
              this.processAutoPlayTimers.delete(index);
              this.autoPlayingProcessIndexes.add(index);
            }, 3000);
            this.processAutoPlayTimers.set(index, timer);
            return;
          }

          const timer = this.processAutoPlayTimers.get(index);
          if (timer) {
            clearTimeout(timer);
            this.processAutoPlayTimers.delete(index);
          }
          this.autoPlayingProcessIndexes.delete(index);
        });
      },
      { threshold: 0.55 }
    );

    document.querySelectorAll('.process-step').forEach((el) => this.processViewportObserver?.observe(el));
  }
}

