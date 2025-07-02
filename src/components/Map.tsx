import { useEffect, useRef, useState, type FunctionComponent } from 'react';
import Map, { Marker, type MapRef } from 'react-map-gl/mapbox';
import { useAtomValue } from 'jotai';
import { panelWidthAtom, placementAtom, sortedHotelsAtom } from '@/store/atoms';
import HotelPin from './Map/HotelPin';
import VenuePin from './Map/VenurPin';
//import { appData } from '@/data/appData';

interface GroupMapProps {
    lat: number;
    lng: number;
    name?: string;
    address?: string;
}

const GroupMap: FunctionComponent<GroupMapProps> = ({ lat, lng }) => {
    const placement = useAtomValue(placementAtom);
    const panelWidth = useAtomValue(panelWidthAtom);
    const hotels = useAtomValue(sortedHotelsAtom);

    const [viewState, setViewState] = useState({
        latitude: lat,
        longitude: lng,
        padding:
            placement === 'right'
                ? { top: 50, bottom: 50, left: 50, right: panelWidth }
                : { top: 50, bottom: 50, left: panelWidth, right: 50 },
    });

    const mapRef = useRef<MapRef | null>(null);
    const map = mapRef.current?.getMap();

    // Move to utility function
    //const minLat = Math.min(
    //    ...hotelsData
    //        .map(p => p.lat)
    //        .filter((lat): lat is number => typeof lat === 'number'),
    //);
    //const maxLat = Math.max(
    //    ...hotelsData
    //        .map(p => p.lat)
    //        .filter((lat): lat is number => typeof lat === 'number'),
    //);
    //const minLng = Math.min(
    //    ...hotelsData
    //        .map(p => p.lng)
    //        .filter((lng): lng is number => typeof lng === 'number'),
    //);
    //const maxLng = Math.max(
    //    ...hotelsData
    //        .map(p => p.lng)
    //        .filter((lng): lng is number => typeof lng === 'number'),
    //);

    useEffect(() => {
        if (!map) return;

        const _pads = {
            padding: {
                top: 50,
                bottom: 50,
                left: placement === 'left' ? panelWidth : 50,
                right: placement === 'right' ? panelWidth : 50,
            },
            duration: 500,
        };

        map.easeTo(_pads);

        //console.log(map.getPadding(), panelWidth, _pads);
    }, [map, panelWidth, placement]);

    //const [minLng, minLat, maxLng, maxLat] = bbox(appData.hotels);
    //console.log()

    return (
        <div className="fixed inset-0 z-0 bg-stone-200">
            <Map
                ref={mapRef}
                mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_KEY}
                {...viewState}
                onMove={event =>
                    setViewState({
                        ...event.viewState,
                        padding: {
                            right: event.viewState.padding?.right || 0,
                            left: event.viewState.padding?.left || 0,
                            bottom: 0,
                            top: 0,
                        },
                    })
                }
                mapStyle={`${import.meta.env.VITE_MAPBOX_STYLE_URL}`}
                style={{ width: '100%', height: '100vh' }}
                attributionControl={false}
                reuseMaps={true}
                minZoom={13.3}
                maxZoom={13.3}
            >
                <Marker
                    latitude={lat}
                    longitude={lng}
                    anchor="bottom"
                    style={{ position: 'absolute', top: 0 }}
                >
                    <VenuePin />
                </Marker>
                {hotels.map(hotel => (
                    <Marker
                        key={hotel.hmid}
                        latitude={hotel.lat || 0}
                        longitude={hotel.lng || 0}
                        anchor="bottom"
                        style={{ position: 'absolute', top: 0 }}
                    >
                        <HotelPin
                            stars={hotel.stars}
                            name={hotel.name}
                            price={hotel.price}
                        />
                    </Marker>
                ))}
            </Map>
        </div>
    );
};

export default GroupMap;
