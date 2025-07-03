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

// Data in here should be read only
export const appData: AppData = {
    event: eventData,
    venue: venueData,
    hotels: hotelsData,
};
