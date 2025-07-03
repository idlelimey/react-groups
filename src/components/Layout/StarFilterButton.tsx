import type { FunctionComponent } from 'react';
import { Button } from '../ui/button';
import { Star } from 'lucide-react';
import { useAtom } from 'jotai';
import { starsFilterAtom } from '@/store/atoms';

interface StarFilterButtonProps {
    stars: number;
}

const StarFilterButton: FunctionComponent<StarFilterButtonProps> = ({
    stars,
}) => {
    const [starsFilter, setStarsFilter] = useAtom(starsFilterAtom);
    const handleClick = () => {
        setStarsFilter(prev => ({
            ...prev,
            [stars]: !prev[stars],
        }));
    };
    return (
        <Button
            variant={'outline'}
            size="sm"
            className={`${starsFilter[stars] && 'border-black dark:border-white ring-1 ring-black dark:ring-white'} gap-0.5 !px-1.5`}
            onClick={handleClick}
        >
            {Array.from({ length: stars }, (_, i) => (
                <Star
                    key={i}
                    className={`size-2 hover:fill-black ${starsFilter[stars] ? 'fill-black dark:fill-white' : 'fill-border stroke-border'}`}
                />
            ))}
        </Button>
    );
};

export default StarFilterButton;
