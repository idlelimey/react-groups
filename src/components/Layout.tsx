import {
    lazy,
    Suspense,
    useEffect,
    useRef,
    type FunctionComponent,
} from 'react';
import { Button } from './ui/button';
import HotelCard from './ui/HotelCard';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
    assistHighlightAtom,
    panelWidthAtom,
    placementAtom,
    sortedHotelsAtom,
} from '@/store/atoms';
import NoHotels from './Layout/NoHotels';
import { ScrollArea } from './ui/scroll-area';
import TopBar from './Layout/TopBar';
import TitleBar from './Layout/TitleBar';
import Preferences from './Layout/Preferences';

const Gallery = lazy(() => import('../components/Layout/Gallery'));

type LayoutProps = {
    onMount: () => void;
};

const Layout: FunctionComponent<LayoutProps> = ({ onMount }) => {
    // State
    const [highlight, setHighlight] = useAtom(assistHighlightAtom);
    const placement = useAtomValue(placementAtom);
    const hotels = useAtomValue(sortedHotelsAtom);
    const setPanelWidth = useSetAtom(panelWidthAtom);

    // Refs
    const assistanceRef = useRef<HTMLDivElement>(null);
    const panel = useRef<HTMLDivElement>(null);

    const handleAssitanceScroll = () => {
        assistanceRef.current?.scrollIntoView();
        setTimeout(() => {
            setHighlight(true);
        }, 500);
        setTimeout(() => {
            setHighlight(false);
        }, 2000);
    };

    useEffect(() => {
        if (!panel.current || !setPanelWidth) return;
        const observer = new ResizeObserver(entries => {
            for (const entry of entries) {
                setPanelWidth(Math.floor(entry.contentRect.width + 32)); // Adding 32 for padding
            }
        });
        observer.observe(panel.current);
        return () => {
            observer.disconnect();
        };
    }, [panel, setPanelWidth]);

    useEffect(() => {
        const timer = setTimeout(() => {
            onMount();
        }, 0);
        return () => clearTimeout(timer);
    }, [onMount]);

    return (
        <div
            className={`p-3 sm:p-8 absolute h-4/5 sm:h-full bottom-0 w-fit ${placement === 'left' ? 'left-0' : 'right-0'}`}
        >
            <div
                className={`bg-background rounded-2xl h-full w-full max-w-2xl shadow-2xl overflow-hidden`}
                ref={panel}
            >
                <div className="grow flex flex-col overflow-hidden h-full">
                    <div className="p-3 sm:p-6 grow-0">
                        <TopBar
                            cutoff={9}
                            mcode="MTEST"
                            assistClick={handleAssitanceScroll}
                        />
                        <TitleBar />
                        <Preferences />
                    </div>
                    <div className="overflow-hidden h-full">
                        <ScrollArea className="h-full grow grid grid-cols-1 gap-7 scroll-smooth">
                            <div className="grid grid-cols-1 gap-7 p-3 sm:p-6 !pt-0">
                                {hotels.map(hotel => (
                                    <HotelCard key={hotel.hmid} {...hotel} />
                                ))}
                                {hotels.length === 0 && <NoHotels />}
                                <div
                                    className={`grid grid-cols-1 gap-2 sm:gap-4 rounded-lg p-6 transition-all duration-1000 ease-in-out bg-muted border ${highlight ? 'ring-8 ring-primary/20  border-primary' : ' ring-0 ring-transparent border-transparent'}`}
                                    ref={assistanceRef}
                                >
                                    <h2 className="text-xl sm:text-2xl">
                                        Hotel booking assistance
                                    </h2>
                                    <p className="text-sm sm:text-base">
                                        For assistance with your hotel booking,
                                        please contact the Eurovision Song
                                        Contest Accommodation team
                                    </p>
                                    <div>
                                        <Button variant={'hotelmap'}>
                                            Email
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </div>
            <Suspense>
                <Gallery />
            </Suspense>
        </div>
    );
};

export default Layout;
