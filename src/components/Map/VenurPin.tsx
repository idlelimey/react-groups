import { appData } from '@/data/appData';
import { MapPin } from 'lucide-react';
import type { FunctionComponent } from 'react';

const VenuePin: FunctionComponent = () => {
    return (
        <div className="flex flex-col items-center justify-center relative">
            <MapPin size={64} className="fill-black stroke-white stroke-1" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-full bg-white rounded-md shadow-md p-2 z-10 w-max text-center text-black">
                {appData.venue.name && (
                    <div className="text-xs font-semibold">
                        {appData.venue.name}
                    </div>
                )}
                {appData.venue.address && (
                    <div className="text-[10px]">{appData.venue.address}</div>
                )}
            </div>
        </div>
    );
};

export default VenuePin;
