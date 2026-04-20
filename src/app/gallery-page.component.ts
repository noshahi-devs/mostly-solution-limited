import { AfterViewInit, Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

type GalleryFilter = 'all' | 'repairs' | 'before-after' | 'tools' | 'on-site';

interface GalleryImageCard {
  title: string;
  description: string;
  image: string;
}

interface BeforeAfterItem {
  id: string;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
}

interface OnSiteCard extends GalleryImageCard {
  badge: string;
}

@Component({
  selector: 'app-gallery-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.css']
})
export class GalleryPageComponent implements AfterViewInit {
  activeFilter: GalleryFilter = 'all';
  lightboxIndex = 0;
  lightboxOpen = false;
  private observer: IntersectionObserver | null = null;

  readonly filterButtons: Array<{ label: string; value: GalleryFilter }> = [
    { label: 'All', value: 'all' },
    { label: 'Repairs', value: 'repairs' },
    { label: 'Before/After', value: 'before-after' },
    { label: 'Tools', value: 'tools' },
    { label: 'On-Site', value: 'on-site' }
  ];

  readonly mechanicAtWork: GalleryImageCard[] = [
    {
      title: 'Engine Diagnostic Repair',
      description: 'Precision fault tracing and same-day repair support.',
      image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&q=80&w=1400'
    },
    {
      title: 'Brake and Tire Service',
      description: 'Safe braking performance and wheel alignment checks.',
      image: 'assets/service_brake_repair_1776492609413.png'
    },
    {
      title: 'Battery Replacement',
      description: 'Fast battery diagnostics and reliable replacement setup.',
      image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&q=80&w=1400'
    },
    {
      title: 'Oil Change Service',
      description: 'Professional oil service with multi-point inspection.',
      image: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&q=80&w=1400'
    },
    {
      title: 'Electrical Diagnostics',
      description: 'Sensor-level electrical troubleshooting by experts.',
      image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&q=80&w=1400'
    },
    {
      title: 'Undercar Inspection',
      description: 'Detailed underside checks for mechanical reliability.',
      image: 'https://images.unsplash.com/photo-1599256872237-5dcc0fbe9668?auto=format&fit=crop&q=80&w=1400'
    },
    {
      title: 'Suspension Service',
      description: 'Comfort and stability restoration with quality parts.',
      image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&q=80&w=1400'
    },
    {
      title: 'Quick Workshop Turnaround',
      description: 'Efficient process with professional service standards.',
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=1400'
    }
  ];

  readonly beforeAfterRepairs: BeforeAfterItem[] = [
    {
      id: 'engine',
      title: 'Engine Bay Restoration',
      description: 'From heavy grime and wear to a clean, inspected, ready-to-run engine bay.',
      beforeImage: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&q=80&w=1400',
      afterImage: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=1400'
    },
    {
      id: 'body',
      title: 'Panel and Finish Correction',
      description: 'From damaged appearance to polished finish through expert body correction.',
      beforeImage: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=1400',
      afterImage: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&q=80&w=1400'
    }
  ];

  readonly toolsAndVan: GalleryImageCard[] = [
    {
      title: 'Professional Tool Kit',
      description: 'OEM-grade tools and calibrated equipment for accurate repairs.',
      image: 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&q=80&w=1400'
    },
    {
      title: 'Mobile Service Van',
      description: 'Branded service van equipped for rapid roadside and doorstep support.',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1400'
    },
    {
      title: 'Diagnostic Devices',
      description: 'Advanced scanners and test tools for transparent fault diagnosis.',
      image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=1400'
    },
    {
      title: 'Safety and Readiness',
      description: 'Every job is performed with a strict safety-first workflow.',
      image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&q=80&w=1400'
    }
  ];

  readonly onsiteService: OnSiteCard[] = [
    {
      title: 'Roadside Assistance',
      description: 'Rapid roadside diagnostics and repair with emergency response support.',
      badge: 'Roadside',
      image: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&q=80&w=1400'
    },
    {
      title: 'Home Service Visit',
      description: 'Certified mechanics performing repairs directly at your home.',
      badge: 'Home',
      image: 'https://images.unsplash.com/photo-1613214149922-f1809c99b414?auto=format&fit=crop&q=80&w=1400'
    },
    {
      title: 'Office Parking Support',
      description: 'Service while you work with minimal interruption to your day.',
      badge: 'Office',
      image: 'https://images.unsplash.com/photo-1632823469850-2f77dd9c7f93?auto=format&fit=crop&q=80&w=1400'
    },
    {
      title: 'Emergency Breakdown Help',
      description: 'On-site troubleshooting for urgent non-start and performance issues.',
      badge: 'Emergency',
      image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=1400'
    }
  ];

  readonly compareValue: Record<string, number> = {
    engine: 55,
    body: 48
  };

  get lightboxItems(): GalleryImageCard[] {
    const compareItems: GalleryImageCard[] = this.beforeAfterRepairs.flatMap((item) => [
      {
        title: `${item.title} (Before)`,
        description: item.description,
        image: item.beforeImage
      },
      {
        title: `${item.title} (After)`,
        description: item.description,
        image: item.afterImage
      }
    ]);

    return [...this.mechanicAtWork, ...compareItems, ...this.toolsAndVan, ...this.onsiteService];
  }

  ngAfterViewInit(): void {
    this.setupObserver();
    this.observeRevealElements();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeLightbox();
  }

  @HostListener('document:keydown.arrowRight')
  onArrowRight(): void {
    if (this.lightboxOpen) {
      this.nextImage();
    }
  }

  @HostListener('document:keydown.arrowLeft')
  onArrowLeft(): void {
    if (this.lightboxOpen) {
      this.prevImage();
    }
  }

  setFilter(filter: GalleryFilter): void {
    this.activeFilter = filter;
    queueMicrotask(() => this.observeRevealElements());
  }

  shouldShow(section: Exclude<GalleryFilter, 'all'>): boolean {
    return this.activeFilter === 'all' || this.activeFilter === section;
  }

  setCompare(itemId: string, value: string): void {
    this.compareValue[itemId] = Number(value);
  }

  openLightbox(imageUrl: string): void {
    const idx = this.lightboxItems.findIndex((item) => item.image === imageUrl);
    this.lightboxIndex = idx >= 0 ? idx : 0;
    this.lightboxOpen = true;
  }

  closeLightbox(): void {
    this.lightboxOpen = false;
  }

  nextImage(): void {
    this.lightboxIndex = (this.lightboxIndex + 1) % this.lightboxItems.length;
  }

  prevImage(): void {
    this.lightboxIndex = (this.lightboxIndex - 1 + this.lightboxItems.length) % this.lightboxItems.length;
  }

  private setupObserver(): void {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
  }

  private observeRevealElements(): void {
    if (!this.observer) {
      return;
    }

    document.querySelectorAll('.reveal').forEach((el) => this.observer?.observe(el));
  }
}
