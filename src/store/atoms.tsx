import { appData } from '@/data/appData';
import { type HotelData } from '@/data/types';
import { atom } from 'jotai';

// Theme
type ThemeMode = 'light' | 'dark' | 'system';

const isThemeMode = (value: unknown): value is ThemeMode =>
    typeof value === 'string' && ['light', 'dark', 'system'].includes(value);

const getSystemTheme = (): ThemeMode => {
    // Is the theme in storage?
    const ls = localStorage.getItem('theme');

    if (ls && isThemeMode(ls)) {
        return ls;
    }

    if (typeof window !== 'undefined' && window.matchMedia) {
        const mode = window.matchMedia('(prefers-color-scheme: dark)')
            ? 'dark'
            : 'light';
        localStorage.setItem('theme', mode);
        return mode;
    }

    return 'light';
};

const themeValueAtom = atom<ThemeMode>(getSystemTheme());
export const themeAtom = atom(
    get => get(themeValueAtom),
    (_unused, set, newTheme: ThemeMode) => {
        set(themeValueAtom, newTheme); // update the source
        localStorage.setItem('theme', newTheme); // sync to localStorage
    },
);

// Assistance highlighted
export const assistHighlightAtom = atom<boolean>(false);

// Panel Placement
type PlacementType = 'left' | 'right';
export const placementAtom = atom<PlacementType>('left');

// Mobile show/hide map
export const showMapAtom = atom<boolean>(true);

// Panel width
type PanelWidthType = number;
export const panelWidthAtom = atom<PanelWidthType>(0);

// Gallery
type GalleryType = {
    active: boolean;
    hmid: number;
};
export const galleryAtom = atom<GalleryType>({ active: false, hmid: 0 });

// Sort preference
type SortPrefType = string;
export const sortPrefAtom = atom<SortPrefType>('pa');

// Stars filter
const initStars = Object.fromEntries(
    Array.from(new Set(appData.hotels.map(r => r.stars)))
        .sort((a, b) => b - a)
        .map(star => [star, true]),
);
export const starsFilterAtom = atom<{ [key: number]: boolean }>(initStars);

// Hotels
const hotelsAtom = atom<HotelData[]>(appData.hotels);

// Hovered hotel
export const hoveredHotelAtom = atom<number | null>(null);

// Rates
export const maxRateAtom = atom(get => {
    const hotels = get(hotelsAtom);
    return Math.max(...hotels.flatMap(hotel => Object.values(hotel.price)));
});
export const minRateAtom = atom(get => {
    const hotels = get(hotelsAtom);
    return Math.min(...hotels.flatMap(hotel => Object.values(hotel.price)));
});
const rateInternalAtom = atom<number | null>(null);
export const rateAtom = atom(
    get => {
        const internal = get(rateInternalAtom);
        if (internal !== null) return internal;
        return get(maxRateAtom); // fallback only if unset
    },
    (_get, set, newValue: number) => {
        set(rateInternalAtom, newValue);
    },
);

// Rooms
export const maxRoomsAtom = atom(get => {
    const hotels = get(hotelsAtom);
    return Math.max(...hotels.flatMap(hotel => hotel.roomsRemaining));
});
export const minRoomsAtom = atom(get => {
    const hotels = get(hotelsAtom);
    return Math.min(...hotels.flatMap(hotel => hotel.roomsRemaining));
});
const roomsInternalAtom = atom<number | null>(null);
export const roomsAtom = atom(
    get => {
        const internal = get(roomsInternalAtom);
        if (internal !== null) return internal;
        return get(minRoomsAtom); // fallback only if unset
    },
    (_get, set, newValue: number) => {
        set(roomsInternalAtom, newValue);
    },
);

// Filtered and sorted Hotels
export const sortedHotelsAtom = atom(get => {
    const hotels = get(hotelsAtom);
    const sortby = get(sortPrefAtom);
    const starsFilter = get(starsFilterAtom);
    const starFiltered = hotels.filter(hotel => starsFilter[hotel.stars]);
    const priceFiltered = starFiltered.filter(hotel => {
        const prices = Object.values(hotel.price);
        const lowestPrice = Math.min(...prices);
        return lowestPrice <= get(rateAtom);
    });
    const roomsFiltered = priceFiltered.filter(
        hotel => hotel.roomsRemaining >= get(roomsAtom),
    );

    return [...roomsFiltered].sort((a, b) => {
        switch (sortby) {
            case 'pa':
                return a.price[1] - b.price[1];
            case 'pd':
                return b.price[1] - a.price[1];
            case 'na':
                return a.name.localeCompare(b.name);
            case 'ra':
                return b.peak - a.peak;
            case 'dv':
                return (a.distance ?? 999) - (b.distance ?? 999);
            case 'tr':
                return b.rating - a.rating;
            default:
                return 0;
        }
    });
});
