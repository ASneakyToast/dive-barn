/**
 * Dive Barn Site Configuration
 * Centralized configuration for site-wide settings
 */

import type { SiteConfig, VenueInfo } from '../types';

export const SITE_CONFIG: SiteConfig = {
  title: 'Dive Barn - Arts Festival Archive',
  description: 'An arts and music gathering that took place on a ranch in Mendocino County (2024-2025)',
  url: 'https://divebarn.com',
  image: '/images/dive-barn-social.jpg'
};

export const VENUE_INFO: VenueInfo = {
  name: 'Yorkville Schoolhouse Ranch',
  address: 'Mendocino County, CA',
  description: 'A property stewarded by the Henderson/Carlson family',
  amenities: [
    'Outdoor stages',
    'Food vendors',
    'Art installations',
    'Parking',
    'Restrooms',
    'Water stations'
  ]
};

export const SOCIAL_LINKS = {
  rsvp: '',
  instagram: '',
  facebook: '',
  email: '',
  thisIsAHouseGallery: 'https://thisisahousegallery.com',
  offHoursSF: 'https://www.instagram.com/offhours_sf/'
};

export const NAVIGATION_LINKS = [
  { href: '/#barn', label: 'Thank You' },
  { href: '/#whats-next', label: "What's Next" },
  { href: '/#faq', label: 'FAQ' }
];
