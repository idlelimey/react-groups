import { useEffect, useRef, type FunctionComponent } from 'react';

interface TripAdvisorScoreProps {
    score: number;
    size?: number;
}

const TripAdvisorScore: FunctionComponent<TripAdvisorScoreProps> = ({
    score,
    size = 13,
}) => {
    const taElement = useRef<HTMLDivElement>(null);

    useEffect(() => {
        taElement.current?.style.setProperty('--ta-size', size + 'px');
    }, [size]);

    return (
        <div
            className="flex space-x-0.5 hm--ta-rating"
            data-score={score}
            ref={taElement}
        >
            <img
                src="/ta_logo.svg"
                alt="TripAdvisor"
                style={{ height: size + 'px' }}
                className="mr-1 dark:invert"
            />
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
};

export default TripAdvisorScore;
