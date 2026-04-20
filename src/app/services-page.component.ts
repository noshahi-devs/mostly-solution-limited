import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services-page.component.html'
})
export class ServicesPageComponent {
  readonly serviceCards = [
    {
      title: 'Mobile Mechanic',
      price: 'From GBP 45',
      description: '24/7 immediate support with rapid response and repair at any location.',
      image: 'assets/service_engine_diagnostic_1776492556369.png',
      points: ['24/7 Availability', 'On-site Repairs', 'Emergency Response', 'All Locations']
    },
    {
      title: 'Comprehensive Vehicle Inspections',
      price: 'From GBP 85',
      description: 'Pre-purchase, pre-trip, and detailed diagnostics to ensure vehicle readiness and performance.',
      image: 'https://media.istockphoto.com/id/2203010081/photo/diagnostic-car-software-in-the-car-service.jpg?s=612x612&w=0&k=20&c=8ZbFhQwyd15iXnFp_NfiOp-W6NN9tNd5lgLZp-RNaEc=',
      points: ['Pre-purchase Inspection', 'Diagnostic Testing', 'Performance Analysis', 'Detailed Reports']
    },
    {
      title: 'Repair Services',
      price: 'From GBP 65',
      description: 'Minor and major repairs for various vehicle types and brands, ensuring quick turnaround times.',
      image: 'assets/service_brake_repair_1776492609413.png',
      points: ['Engine Repairs', 'Transmission Service', 'Brake Systems', 'Electrical Work']
    },
    {
      title: 'Annual Maintenance',
      price: 'From GBP 120',
      description: 'Scheduled maintenance including oil changes, brake inspections, tire rotations, and more.',
      image: 'assets/fleet_maintenance.png',
      points: ['Oil Changes', 'Brake Inspection', 'Tire Rotation', 'Filter Replacement']
    }
  ];
}
