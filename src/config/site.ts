/**
 * Dive Barn Site Configuration
 * Centralized configuration for site-wide settings
 */

import type { SiteConfig, VenueInfo } from '../types';

export const SITE_CONFIG: SiteConfig = {
  title: 'Dive Barn - Annual Arts Festival',
  description: 'An arts and music gathering on a ranch in Mendocino County',
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
  rsvp: 'https://partiful.com/e/Ft3EJk5f8OUREaoQKtBo',
  instagram: '',
  facebook: '',
  email: ''
};

export const NAVIGATION_LINKS = [
  { href: '/#barn', label: 'Thank You' },
  { href: '/#whats-next', label: "What's Next" },
  { href: '/#faq', label: 'FAQ' }
];
