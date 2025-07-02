import { hotelsData } from './hotels';
import type { AppData, EventData, VenueData } from './types';

export const venueData: VenueData = {
    name: "Tim's House",
    address: 'Morant Road, Colchester, UK',
    lat: 51.882651,
    lng: 0.917607,
};

export const eventData: EventData = {
    event_title: "Tim's Big Test Event",
    event_subtitle: 'Colchester',
    start_date: '2025-08-10',
    end_date: '2025-08-18',
    color: '#e86559',
    mcode: 'M0TIM',
};

// Images, temporary for testing
export const images: string[] = [
    'https://cruip-tutorials.vercel.app/masonry/masonry-01.jpg',
    'https://cruip-tutorials.vercel.app/masonry/masonry-02.jpg',
    'https://cruip-tutorials.vercel.app/masonry/masonry-03.jpg',
    'https://cruip-tutorials.vercel.app/masonry/masonry-04.jpg',
    'https://cruip-tutorials.vercel.app/masonry/masonry-05.jpg',
    'https://cruip-tutorials.vercel.app/masonry/masonry-06.jpg',
    'https://cruip-tutorials.vercel.app/masonry/masonry-07.jpg',
    'https://cruip-tutorials.vercel.app/masonry/masonry-08.jpg',
    'https://cruip-tutorials.vercel.app/masonry/masonry-09.jpg',
    'https://cruip-tutorials.vercel.app/masonry/masonry-10.jpg',
    'https://cruip-tutorials.vercel.app/masonry/masonry-11.jpg',
    'https://cruip-tutorials.vercel.app/masonry/masonry-12.jpg',
];

// Data in here should be read only
export const appData: AppData = {
    event: eventData,
    venue: venueData,
    hotels: hotelsData,
};
