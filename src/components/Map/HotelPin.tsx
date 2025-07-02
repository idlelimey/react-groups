import { Star } from 'lucide-react';
import { memo, type FunctionComponent } from 'react';

interface HotelPinProps {
    stars: number;
    name: string;
    price: object;
}

const HotelPin: FunctionComponent<HotelPinProps> = ({ stars, name, price }) => {
    const lowestPrice = Math.min(...Object.values(price).map(Number));

    return (
        <div className="flex flex-col items-center justify-center relative group">
            <div className="grid grid-cols-1">
                <div className="rounded-sm bg-primary">
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
                        className="m-auto fill-primary -translate-y-[1px]"
                    >
                        <polygon points="50,50 0,0 100,0" />
                    </svg>
                </div>
            </div>
            <img src="/hotel-cropped.png" alt={name} className="w-14" />
            <div className="hidden group-hover:block absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-full bg-white rounded-md shadow-md p-2 z-10 w-max">
                <div className="text-xs font-semibold text-center text-black">
                    {name}
                </div>
            </div>
        </div>
    );
};

export default memo(HotelPin);
