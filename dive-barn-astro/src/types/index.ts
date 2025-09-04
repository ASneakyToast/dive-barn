// Type definitions for Dive Barn Astro project

export interface SiteConfig {
  title: string;
  description: string;
  url: string;
  image: string;
}

export interface EventInfo {
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
}

export interface PerformerInfo {
  name: string;
  time: string;
  stage?: string;
  description?: string;
  image?: string;
}

export interface VenueInfo {
  name: string;
  address: string;
  description: string;
  amenities: string[];
  directions?: string;
}

export interface FinancialData {
  category: string;
  amount: number;
  description: string;
  percentage?: number;
}

export interface ComponentProps {
  class?: string;
  id?: string;
}

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'small' | 'normal' | 'large';
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;