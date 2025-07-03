import { hoveredHotelAtom } from '@/store/atoms';
import { useAtomValue } from 'jotai';
import { Star } from 'lucide-react';
import { memo, type FunctionComponent } from 'react';
import { Marker } from 'react-map-gl/mapbox';

interface HotelPinProps {
    stars: number;
    name: string;
    price: object;
    hmid: number;
    lat: number;
    lng: number;
}

const HotelPin: FunctionComponent<HotelPinProps> = ({
    stars,
    name,
    price,
    hmid,
    lat,
    lng,
}) => {
    const lowestPrice = Math.min(...Object.values(price).map(Number));
    const hovered = useAtomValue(hoveredHotelAtom);
    const isHovered = hovered === hmid;

    return (
        <Marker
            latitude={lat || 0}
            longitude={lng || 0}
            anchor="bottom"
            style={{ position: 'absolute', top: 0 }}
            className={`hover:z-10 ${isHovered ? 'z-10' : ''}`}
        >
            <div className="flex flex-col items-center justify-center group">
                <div className="grid grid-cols-1">
                    <div
                        className={`rounded-sm bg-primary ring-primary/33 scale-100 ${isHovered ? 'ring-4 scale-150 bg-linear-to-b from-primary to-primary-dark' : 'ring-0'} transition-all duration-300`}
                    >
                        <div className=" text-white text-xs font-bold pt-1 px-1.5 pb-0 min-w-10 text-center">
                            £{lowestPrice}
                        </div>
                        <div className=" flex justify-center align-middle pb-1.5">
                            {Array.from({ length: stars }, (_, i) => (
                                <Star
                                    size={8}
                                    fill="white"
                                    stroke="white"
                                    key={i}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <svg
                            width="10"
                            viewBox="0 0 100 50"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`m-auto fill-primary -translate-y-[1px] ${isHovered ? 'invisible' : ''}`}
                        >
                            <polygon points="50,50 0,0 100,0" />
                        </svg>
                    </div>
                </div>
                <img src="/hotel-cropped.png" alt={name} className="w-14" />
                <div
                    className={`${isHovered ? 'block' : 'hidden'} group-hover:block absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-full bg-white rounded-md shadow-md p-2 z-10 w-max`}
                >
                    <div className="text-xs font-semibold text-center text-black">
                        {name}
                    </div>
                </div>
            </div>
        </Marker>
    );
};

export default memo(HotelPin);
