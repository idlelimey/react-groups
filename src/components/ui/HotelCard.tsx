import { memo, type FunctionComponent } from 'react';
import { Button } from './button';
import { CarFrontIcon, Images, StarIcon } from 'lucide-react';
import TripAdvisorScore from '../Layout/TripAdvisorScore';
import type { HotelData } from '@/data/types';
import Discount from '../HotelCard/Discount';
import Person from '../icons/Person';
import { useSetAtom } from 'jotai';
import { galleryAtom } from '@/store/atoms';

const HotelCard: FunctionComponent<HotelData> = memo(({ ...props }) => {
    const setGallery = useSetAtom(galleryAtom);
    return (
        <div className="bg-background rounded-lg shadow-xl border-background border-4 ring-background ring-2 dark:shadow-xl/60">
            <div className="grid grid-cols-3 grid-rows-2 gap-0.5 sm:gap-[3px]">
                <div
                    className="bg-stone-200 col-span-2 row-span-2 bg-cover relative rounded-tl-lg rounded-bl"
                    style={{
                        backgroundImage:
                            "url('https://i.travelapi.com/lodging/1000000/70000/65800/65752/5f9c62b9_z.jpg')",
                    }}
                >
                    {props.roomDiscount && (
                        <Discount discount={props.roomDiscount} />
                    )}
                </div>
                <div
                    className="bg-stone-200 h-16 sm:h-32 bg-cover rounded-tr-lg relative"
                    style={{
                        backgroundImage:
                            "url('https://i.travelapi.com/lodging/1000000/70000/65800/65752/d361db27_z.jpg')",
                    }}
                >
                    <Button
                        size={'icon'}
                        className="bg-white rounded-full absolute top-2 right-2 ring-white/33 ring-0 hover:ring-4 transition-ring ease-in-out duration-500 hover:bg-white"
                        onClick={() =>
                            setGallery({ active: true, hmid: props.hmid })
                        }
                    >
                        <Images stroke="black" />
                    </Button>
                </div>
                <div
                    className="bg-stone-200 h-16 sm:h-32 bg-cover rounded-br"
                    style={{
                        backgroundImage:
                            "url('https://i.travelapi.com/lodging/1000000/70000/65800/65752/2c13d0a7_z.jpg')",
                    }}
                ></div>
            </div>
            <div className="p-4">
                <div className="mb-4 flex flex-cols">
                    <h2 className="text-xl sm:text-2xl grow">{props.name}</h2>
                    <div className="sm:hidden flex flex-cols gap-1 items-center font-bold">
                        <CarFrontIcon size={18} />
                        <span className=" text-sm">9</span>
                        <div className="text-xs">mins.</div>
                    </div>
                </div>
                <div className="flex gap-4 items-center">
                    <div className="flex gap-0.5">
                        {Array.from({ length: props.stars }).map((_, i) => (
                            <StarIcon
                                className="fill-current"
                                key={i}
                                size={16}
                            />
                        ))}
                    </div>
                    <div className="grow">
                        <TripAdvisorScore
                            score={Math.round(props.rating * 2) / 2}
                        />
                    </div>
                    <div className="text-xs sm:text-sm">
                        <strong>{props.peak}</strong> peak room nights
                    </div>
                </div>

                {props.sustainability?.rating && (
                    <div className="hidden sm:flex items-end gap-2 w-full my-2">
                        <div className="h-5 aspect-square flex items-center justify-center text-white text-xs font-bold bg-lime-500 rounded ml-auto">
                            {props.sustainability.rating}
                        </div>
                        <div className="text-sm font-bold">
                            Hotelmap Sustainability Rating
                        </div>
                    </div>
                )}

                <div className="flex gap-4 mt-4">
                    <div className="flex grow">
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-4">
                            {Object.entries(props.price).map(([key, value]) => {
                                const count = Number(key);
                                return (
                                    <div
                                        key={`${props.hmid}-${key}`}
                                        className="flex items-center"
                                    >
                                        {Array.from(
                                            { length: count },
                                            (_, i) => (
                                                <Person
                                                    key={`${props.hmid}-${key}-${i + 1}`}
                                                    className="fill-primary inline-block not-first:-ml-2"
                                                    strokeWidth={0}
                                                    size={16}
                                                />
                                            ),
                                        )}
                                        <span className="text-md sm:text-xl font-bold">
                                            £{value}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="hidden sm:block">
                        <div className="grid grid-cols-2 font-bold">
                            <div className="flex align-end justify-center">
                                <CarFrontIcon size={18} />
                            </div>
                            <div className="flex justify-center items-end">
                                <span className=" text-sm">9</span>
                            </div>
                            <div className="col-span-2 text-xs">minutes</div>
                        </div>
                    </div>
                    <div>
                        <Button variant="hotelmap">View</Button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default HotelCard;
