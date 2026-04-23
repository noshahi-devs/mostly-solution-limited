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
      title: 'Bodywork & Paint',
      tagline: 'Quotes are based on visual inspection and panel damage.',
      image: 'assets/service_brake_repair_1776492609413.png',
      items: [
        'Smart repair panels and bumper repairs',
        'Bumper and small panel respray',
        'Dent and crack correction before paintwork',
        'Alloy wheel refurbishment and bonnet respray',
        'Full body paint jobs and panel correction'
      ]
    },
    {
      title: 'Remap & Performance',
      tagline: 'Tailored tuning based on vehicle model and current condition.',
      image: 'assets/service_engine_diagnostic_1776492556369.png',
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
      image: 'assets/fleet_maintenance.png',
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
      image: 'assets/mechanic_hero_bg_1776492390130.png',
      items: [
        'Roadside and breakdown recovery',
        'Safe transport to workshop or preferred location',
        'Priority call handling for urgent cases',
        'Support available across London and Reading'
      ]
    }
  ];
}
