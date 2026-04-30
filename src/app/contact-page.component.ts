import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface QuickContact {
  label: string;
  title: string;
  value: string;
}

interface LocationInfo {
  country: string;
  city: string;
  address: string;
  phone: string;
  phonePlain: string;
  hours: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './contact-page.component.html'
})
export class ContactPageComponent {
  activeFaqIndex = 0;

  readonly quickContacts: QuickContact[] = [
    {
      label: 'Call Us',
      title: 'Immediate Response',
      value: '+44 7366 994696'
    },
    {
      label: 'Email Us',
      title: 'Detailed Inquiries',
      value: 'support@mostlysolutions.co.uk'
    },
    {
      label: 'Emergency',
      title: 'Roadside Assistance',
      value: '24/7 Support Available'
    }
  ];

  readonly reasons: string[] = [
    'Mobile mechanic service at your location',
    '24/7 emergency support with rapid mechanic help',
    'Certified technicians and modern diagnostics',
    'Transparent pricing with no hidden costs',
    'Warranty-backed workmanship and support'
  ];

  readonly locations: LocationInfo[] = [
    {
      country: 'Reading',
      city: 'Reading Office',
      address: '45 Friar Street, Reading RG1',
      phone: '+44 118 555 0194',
      phonePlain: '+441185550194',
      hours: 'Mon-Sat 7AM-9PM'
    },
    {
      country: 'London',
      city: 'London',
      address: '42 Kingston Road, London, SW19 1JH',
      phone: '+44 7366 994696',
      phonePlain: '+447366994696',
      hours: 'Mon-Sat 7AM-9PM'
    }
  ];

  readonly faqs: FaqItem[] = [
    {
      question: 'How fast can a mechanic reach my location?',
      answer: 'For urgent requests, we can send a mechanic within 30 to 90 minutes depending on traffic and your exact area.'
    },
    {
      question: 'Do you provide roadside emergency service?',
      answer: 'Yes. We offer 24/7 roadside support, and we can send a mechanic for breakdowns, battery issues, no-start problems, and urgent mechanical faults.'
    },
    {
      question: 'Can I get a quote before confirming service?',
      answer: 'Absolutely. We provide transparent estimates after a quick issue assessment so you can approve confidently.'
    },
    {
      question: 'Which vehicle types do you support?',
      answer: 'Our team handles most petrol, diesel, hybrid, and light commercial vehicles with professional diagnostic tools.'
    },
    {
      question: 'Do you cover both Reading and London locations?',
      answer: 'Our current office coverage is focused on Reading and London, with consistent service standards.'
    },
    {
      question: 'Is there any warranty on repairs?',
      answer: 'Yes. Workmanship warranty is available on eligible repairs and parts, with terms explained before service starts.'
    }
  ];

  onSubmit(event: Event): void {
    event.preventDefault();
    alert('Thanks! Your contact request has been submitted.');
  }

  toggleFaq(index: number): void {
    this.activeFaqIndex = this.activeFaqIndex === index ? -1 : index;
  }
}
