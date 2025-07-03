import type { FunctionComponent } from 'react';
import { Button } from '../ui/button';
import { CircleQuestionMarkIcon } from 'lucide-react';
import SettingsMenu from './SettingsMenu';

interface TopBarProps {
    cutoff: number;
    mcode: string;
    assistClick: () => void;
}

const TopBar: FunctionComponent<TopBarProps> = ({
    cutoff,
    mcode,
    assistClick,
}) => {
    return (
        <div className="bg-muted rounded-lg px-2 sm:p-3 text-xs sm:text-sm flex">
            <div className="grow self-center">
                <strong>{cutoff ?? 9} rooms or fewer?</strong> Switch to{' '}
                <span className="hidden sm:inline">our main </span>
                <a
                    href={`https://hotelmap.com/${mcode}`}
                    className="text-primary font-bold"
                >
                    HotelMap
                </a>
                <span className="hidden sm:inline"> page</span>
            </div>

            <div className="grow-0 self-center">
                <Button
                    variant="link"
                    size="icon"
                    onClick={assistClick}
                    aria-label="Assistance"
                >
                    <CircleQuestionMarkIcon />
                </Button>
            </div>
            <div>
                <SettingsMenu />
            </div>
        </div>
    );
};

export default TopBar;
