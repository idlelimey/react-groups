import { type FunctionComponent } from 'react';
import { Button } from '../ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { useAtom, useAtomValue } from 'jotai';
import { galleryAtom, sortedHotelsAtom } from '@/store/atoms';

const Gallery: FunctionComponent = () => {
    const hotels = useAtomValue(sortedHotelsAtom);
    const [gallery, setGallery] = useAtom(galleryAtom);

    if (gallery.hmid === 0) return;

    const imageOnErrorHandler = (
        event: React.SyntheticEvent<HTMLImageElement, Event>,
    ) => {
        event.currentTarget.src = '/img-error.svg';
    };

    const aspects: string[] = [
        'aspect-3/4',
        'aspect-square',
        'aspect-4/3',
        'aspect-square',
        'aspect-3/4',
        'aspect-square',
        'aspect-5/4',
    ];

    const hotel = hotels.filter(h => h.hmid === gallery.hmid)[0];

    return (
        <div
            className={`${gallery.active ? 'block' : 'hidden'} absolute z-20 top-3 sm:top-8 bottom-3 sm:bottom-8 bg-background rounded-2xl w-full max-w-2xl`}
            //ref={gallery}
        >
            <div className="grid grid-rows-[auto_auto_1fr] gap-6 max-h-full">
                <div className="p-6 pb-0">
                    <div className="bg-muted rounded-lg p-4">
                        <Button
                            variant={'ghost'}
                            onClick={() =>
                                setGallery({ active: false, hmid: 0 })
                            }
                        >
                            <ArrowLeftIcon /> Back to Hotels
                        </Button>
                    </div>
                </div>

                <div className="px-6">
                    <h2 className="text-2xl">{hotel.name}</h2>
                </div>

                <div className="overflow-hidden">
                    <ScrollArea className="h-full">
                        <div className="grid grid-cols-1 gap-6 p-6 pt-0">
                            <img
                                src={hotel.images?.primary}
                                alt="Primary image"
                                className="w-full rounded-xl"
                            />

                            <div className="columns-2 gap-6 w-full">
                                {hotel.images &&
                                    hotel.images.set?.map((url, i) => {
                                        const className =
                                            aspects[i % aspects.length];
                                        return (
                                            <img
                                                key={url}
                                                src={url}
                                                alt={`Image ${i + 1}`}
                                                onError={imageOnErrorHandler}
                                                className={`object-cover w-full rounded-xl mb-6 ${className}`}
                                                loading="lazy"
                                            />
                                        );
                                    })}
                            </div>
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
};

export default Gallery;
