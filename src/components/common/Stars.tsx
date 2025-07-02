import { StarIcon } from 'lucide-react';
import type { FunctionComponent } from 'react';

interface StarsProps {
    count: number;
    size?: number | 16;
}

const Stars: FunctionComponent<StarsProps> = ({ count, size = 16 }) => {
    return (
        <>
            {' '}
            {Array.from({ length: count }).map((_, i) => (
                <StarIcon className="fill-current" key={i} size={size} />
            ))}
        </>
    );
};

export default Stars;
