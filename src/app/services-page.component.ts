import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface ServiceGroup {
  title: string;
  tagline: string;
  image: string;
  items: string[];
}

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services-page.component.html'
})
export class ServicesPageComponent {
  readonly serviceGroups: ServiceGroup[] = [
    {
      title: 'Mechanical Work',
      tagline: 'Clutch, brakes aur tamam mechanical parts ki service.',
      image: 'assets/service_engine_diagnostic_1776492556369.png',
      items: [
        'Clutch inspection, repair and replacement',
        'Brakes, discs, pads, fluid and safety checks',
        'Suspension, steering, bearings and bush repairs',
        'Engine, cooling, belts, battery and starter support',
        'Gearbox, drive train and other mechanical parts'
      ]
    },
    {
      title: 'Body Work',
      tagline: 'Painting, dent removal and light cosmetic repairs.',
      image: 'assets/service_brake_repair_1776492609413.png',
      items: [
        'Painting and panel refinishing',
        'Dent removal and minor body repair',
        'Scratch and bumper touch-ups'
      ]
    },
    {
      title: 'Remap & Performance',
      tagline: 'Tailored tuning based on vehicle model and current condition.',
      image: 'assets/fleet_maintenance.png',
      items: [
        'ECU remap for smoother delivery',
        'Stage setup guidance for daily and performance builds',
        'Diagnostics before and after remap',
        'Safe performance optimization with clear recommendations'
      ]
    },
    {
      title: 'Detailing & Protection',
      tagline: 'Packages adjusted by paint condition and interior requirements.',
      image: 'assets/mechanic_hero_bg_1776492390130.png',
      items: [
        'Inside and out valet and deep clean',
        'Paint correction and restoration',
        'Exterior gloss refresh and protection',
        'Interior trim care and finishing'
      ]
    },
    {
      title: 'Recovery 24/7',
      tagline: 'Emergency recovery service available day and night.',
      image: 'https://plus.unsplash.com/premium_photo-1664298955509-88ea1e6f7bc4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZhc3QlMjByZXBhaXJuZ2NhcnxlbnwwfHwwfHx8MA%3D%3D',
      items: [
        'Roadside and breakdown recovery',
        'Safe transport to workshop or preferred location',
        'Priority call handling for urgent cases',
        'Support available across London and Reading'
      ]
    }
  ];
}
