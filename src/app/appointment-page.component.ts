import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointment-page.component.html'
})
export class AppointmentPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('bookingVideo') bookingVideoRef?: ElementRef<HTMLVideoElement>;
  @ViewChild('bookingCard') bookingCardRef?: ElementRef<HTMLElement>;

  showBookingVideo = false;

  private bookingObserver: IntersectionObserver | null = null;
  private bookingTimer: ReturnType<typeof setTimeout> | null = null;

  onSubmit(event: Event): void {
    event.preventDefault();
    alert('Thank you for choosing Mostly Solution Limited! Your booking request has been sent. We will contact you shortly.');
  }

  ngAfterViewInit(): void {
    this.setupBookingViewportAutoPlay();
  }

  ngOnDestroy(): void {
    this.bookingObserver?.disconnect();
    if (this.bookingTimer) {
      clearTimeout(this.bookingTimer);
      this.bookingTimer = null;
    }
  }

  playBookingVideo(video: HTMLVideoElement): void {
    if (!this.showBookingVideo) {
      video.currentTime = 0;
    }
    void video.play();
  }

  resetBookingVideo(video: HTMLVideoElement): void {
    if (this.showBookingVideo) {
      return;
    }
    video.pause();
    video.currentTime = 0;
  }

  private setupBookingViewportAutoPlay(): void {
    const card = this.bookingCardRef?.nativeElement;
    if (!card) {
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      this.startDelayedBookingVideo();
      return;
    }

    this.bookingObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.startDelayedBookingVideo();
          } else if (this.bookingTimer && !this.showBookingVideo) {
            clearTimeout(this.bookingTimer);
            this.bookingTimer = null;
          }
        });
      },
      { threshold: 0.45 }
    );

    this.bookingObserver.observe(card);
  }

  private startDelayedBookingVideo(): void {
    if (this.bookingTimer || this.showBookingVideo) {
      return;
    }

    this.bookingTimer = setTimeout(() => {
      this.bookingTimer = null;
      this.showBookingVideo = true;
      const video = this.bookingVideoRef?.nativeElement;
      if (!video) {
        return;
      }

      video.muted = true;
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
    }, 3000);
  }
}
