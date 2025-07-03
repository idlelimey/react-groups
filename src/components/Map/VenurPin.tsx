import { appData } from '@/data/appData';
import type { FunctionComponent } from 'react';
import { Marker } from 'react-map-gl/mapbox';

interface VenuePinProps {
    lat: number;
    lng: number;
}

const VenuePin: FunctionComponent<VenuePinProps> = ({ lat, lng }) => {
    return (
        <Marker
            latitude={lat}
            longitude={lng}
            anchor="bottom"
            style={{ position: 'absolute', top: 0 }}
            className="z-20"
        >
            <div className="flex flex-col items-center justify-center relative">
                <img
                    src="/pointerPin.svg"
                    alt={appData.venue.name}
                    className="w-14"
                />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-full bg-white rounded-md shadow-md p-2 z-10 w-max text-center text-black">
                    {appData.venue.name && (
                        <div className="text-xs font-semibold">
                            {appData.venue.name}
                        </div>
                    )}
                    {appData.venue.address && (
                        <div className="text-[10px]">
                            {appData.venue.address}
                        </div>
                    )}
                </div>
            </div>
        </Marker>
    );
};

export default VenuePin;
