import type { FunctionComponent } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import { useAtom } from 'jotai';
import { sortPrefAtom } from '@/store/atoms';

const SortBy: FunctionComponent = () => {
    const [sortPref, setSortPref] = useAtom(sortPrefAtom);
    return (
        <Select defaultValue={sortPref} onValueChange={setSortPref}>
            <SelectTrigger className="w-full sm:w-max !bg-background flex items-center justify-center sm:justify-start">
                <div>
                    <SelectValue
                        placeholder="Sort by"
                        className="hidden bg-background"
                    />
                </div>
            </SelectTrigger>

            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Sort by</SelectLabel>
                    <SelectItem value="pa">
                        Price order - low to high
                    </SelectItem>
                    <SelectItem value="pd">
                        Price order - high to low
                    </SelectItem>
                    <SelectItem value="na">Name order - a to z</SelectItem>
                    <SelectItem value="ra">
                        Rooms available - high to low
                    </SelectItem>
                    <SelectItem value="dv">
                        Distance order - from venue
                    </SelectItem>
                    <SelectItem value="tr">
                        TripAdvisor order - high to low
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default SortBy;
