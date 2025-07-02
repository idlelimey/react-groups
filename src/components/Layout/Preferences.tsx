import {
    maxRateAtom,
    maxRoomsAtom,
    minRoomsAtom,
    rateAtom,
    roomsAtom,
    sortedHotelsAtom,
    starsFilterAtom,
} from '@/store/atoms';
import { useAtom, useAtomValue } from 'jotai';
import { useState, type FunctionComponent } from 'react';
import { Slider } from '../ui/slider';
import SortBy from './SortBy';
import StarFilterButton from './StarFilterButton';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { SlidersHorizontalIcon } from 'lucide-react';

const Preferences: FunctionComponent = () => {
    const [userRate, setUserRate] = useAtom(rateAtom);
    const [userRooms, setUserRooms] = useAtom(roomsAtom);
    const maxRate = useAtomValue(maxRateAtom);
    const maxRooms = useAtomValue(maxRoomsAtom);
    const minRooms = useAtomValue(minRoomsAtom);
    const stars = useAtomValue(starsFilterAtom);
    const hotels = useAtomValue(sortedHotelsAtom);

    const [open, setOpen] = useState(false);

    // Handlers
    const handleRateChange = (val: number[]) => {
        setUserRate(val[0]);
    };
    const handleRoomsChange = (val: number[]) => {
        setUserRooms(val[0]);
    };
    return (
        <>
            <div className="hidden sm:block">
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                    <div className="bg-muted grow rounded-lg p-1 sm:p-3">
                        <div className="flex gap-2 sm:gap-4">
                            <div className="self-center">
                                <strong className="text-sm">Rooms:</strong>
                            </div>
                            <div className="grow self-center">
                                <Slider
                                    defaultValue={[minRooms]}
                                    max={maxRooms}
                                    step={1}
                                    className="w-full"
                                    onValueChange={handleRoomsChange}
                                />
                            </div>
                            <div className="grow-0">
                                <div className="grow-0 border bg-background rounded-md py-1 px-3 h-9 text-right min-w-12">
                                    {userRooms}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-muted grow rounded-lg p-1 sm:p-3">
                        <div className="flex gap-2 sm:gap-4">
                            <div className="self-center">
                                <strong className="text-sm">Max. rate:</strong>
                            </div>
                            <div className="grow self-center">
                                <Slider
                                    defaultValue={[maxRate]}
                                    max={maxRate}
                                    step={1}
                                    className="w-full"
                                    onValueChange={handleRateChange}
                                />
                            </div>
                            <div className="grow-0 border bg-background rounded-md py-1 px-3 h-9 flex">
                                <div>£</div>
                                <div className="grow text-right min-w-12">
                                    {userRate}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-muted rounded-lg p-3 grid grid-cols-[1fr_auto_auto] gap-4 w-full col-span-2 items-center">
                        <div>
                            <SortBy />
                        </div>
                        <div className="flex gap-1 grow self-center">
                            {Object.keys(stars)
                                .sort((a, b) => Number(b) - Number(a))
                                .map((s, i) => (
                                    <StarFilterButton
                                        stars={Number(s)}
                                        key={i}
                                    />
                                ))}
                        </div>
                        <div className="text-sm text-right">
                            Showing <strong>{hotels.length}</strong> hotels
                        </div>
                    </div>
                </div>
            </div>
            <div className="sm:hidden">
                <div className="flex flex-cols">
                    <div>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button variant={'outline'} size={'icon'}>
                                    <SlidersHorizontalIcon />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="p-3"
                                side="right"
                                align="start"
                            >
                                <div className="grid grid-cols-1 gap-3">
                                    <strong className="text-xs text-muted-foreground">
                                        Filters:
                                    </strong>
                                    <div className="flex gap-2 p-3 bg-muted rounded-lg">
                                        <div className="self-center">
                                            <strong className="text-xs">
                                                Rooms:
                                            </strong>
                                        </div>
                                        <div className="grow self-center">
                                            <Slider
                                                defaultValue={[minRooms]}
                                                max={maxRooms}
                                                step={1}
                                                className="w-full"
                                                onValueChange={
                                                    handleRoomsChange
                                                }
                                            />
                                        </div>
                                        <div className="grow-0">
                                            <div className="grow-0 border bg-background rounded-md py-1 px-3 h-9 text-right min-w-9 text-sm flex items-center">
                                                {userRooms}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 p-3 bg-muted rounded-lg">
                                        <div className="self-center">
                                            <strong className="text-xs">
                                                Max. rate:
                                            </strong>
                                        </div>
                                        <div className="grow self-center">
                                            <Slider
                                                defaultValue={[maxRate]}
                                                max={maxRate}
                                                step={1}
                                                className="w-full"
                                                onValueChange={handleRateChange}
                                            />
                                        </div>
                                        <div className="grow-0 border bg-background rounded-md py-1 px-3 h-9 text-sm flex items-center">
                                            <div>£</div>
                                            <div className="grow text-right min-w-9">
                                                {userRate}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-1 grow self-center justify-center">
                                        {Object.keys(stars)
                                            .sort(
                                                (a, b) => Number(b) - Number(a),
                                            )
                                            .map((s, i) => (
                                                <StarFilterButton
                                                    stars={Number(s)}
                                                    key={i}
                                                />
                                            ))}
                                    </div>
                                    <strong className="text-xs text-muted-foreground">
                                        Sort by:
                                    </strong>
                                    <div>
                                        <SortBy />
                                    </div>
                                    <div className="flex justify-end">
                                        <Button
                                            variant={'outline'}
                                            className="!border-primary text-primary"
                                            onClick={() => setOpen(false)}
                                        >
                                            Apply
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="grow text-right flex items-center justify-end">
                        <span>
                            Showing <strong>{hotels.length}</strong> hotels
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Preferences;
