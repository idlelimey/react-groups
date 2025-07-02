export type VenueData = {
    name: string;
    address: string;
    lat: number;
    lng: number;
};

export type EventData = {
    event_logo?: string;
    event_title: string;
    event_subtitle?: string;
    start_date: string;
    end_date: string;
    location?: string;
    company_logo?: string;
    color?: string;
    group_cut_off?: number;
    mcode: string;
};

export type HotelData = {
    name: string;
    rating: number;
    stars: number;
    price: {
        1: number;
        2?: number;
        3?: number;
        4?: number;
    };
    peak: number;
    lat?: number;
    lng?: number;
    hmid: number;
    roomDiscount?: number;
    distance?: number;
    roomsRemaining: number;
    sustainability?: {
        rating?: number;
    };
    images?: {
        primary?: string;
        set?: string[];
    };
};

export type AppData = {
    event: EventData;
    venue: VenueData;
    hotels: HotelData[];
};
