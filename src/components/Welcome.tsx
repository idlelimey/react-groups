import { useState, type FunctionComponent } from 'react';
import { Button } from './ui/button';
import HotelMapLogo from './ui/HotelMapLogo';
import { appData } from '@/data/appData';
import { getDateString } from '@/helpers';

interface WelcomeProps {
    event_logo?: string;
    event_title?: string;
    start_date?: string;
    end_date?: string;
    location?: string;
    company_logo?: string;
    setShowWelcome: React.Dispatch<React.SetStateAction<boolean>>;
}

const Welcome: FunctionComponent<WelcomeProps> = ({ setShowWelcome }) => {
    const [isShowing, setIsShowing] = useState(true);

    return (
        <div
            className={`h-screen w-screen absolute top-0 z-20 bg-zinc-900 ${isShowing ? 'flex' : 'hidden'}`}
        >
            <div
                className="hidden sm:block w-[33vw] min-w-2xs max-w-md bg-cover bg-center lg:block"
                style={{
                    backgroundImage:
                        "url('https://svg.hotelmap.com/assets/svg/zeus/doodle/doodle_exhibition.svg')",
                }}
            ></div>
            <div className="flex flex-col p-12 grow shadow-2xl/80">
                {appData.event?.event_logo && <div>EVENT LOGO</div>}
                <div className="flex flex-col gap-6 grow justify-center">
                    <p className="text-2xl text-primary">
                        Welcome to your hotel block catalogue for
                    </p>
                    <h1 className="text-5xl text-white">
                        {appData.event.event_title}
                    </h1>
                    <p className="text-zinc-400 text-2xl">
                        {getDateString(
                            appData.event.start_date,
                            appData.event.end_date,
                        )}
                        , {appData.event.event_subtitle}
                    </p>
                    <div className="mt-12">
                        <Button
                            variant={'hotelmap'}
                            size={'xl'}
                            onClick={() => {
                                setIsShowing(false);
                                setShowWelcome(false);
                            }}
                        >
                            Enter
                        </Button>
                    </div>
                </div>
                <div>
                    <div className="flex gap-12">
                        {appData.event?.company_logo && <div>COMPANY LOGO</div>}
                        <div>
                            <HotelMapLogo className="fill-white w-30 sm:w-40" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
