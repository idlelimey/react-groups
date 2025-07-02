import type { FunctionComponent } from 'react';

const TitleBar: FunctionComponent = () => {
    return (
        <div className="flex gap-2 sm:gap-4 my-3 sm:my-6">
            <div className="grow">
                <h1 className="text-xl sm:text-2xl md:text-3xl">
                    Group hotel booking
                </h1>
            </div>
            <div className="flex flex-col justify-center">
                <span className="text-[8px]">Powered by</span>
                <img
                    src="https://d1hphgblhugsaw.cloudfront.net/assets/svg/zeus/logos/HotelMap-Logo.svg"
                    alt="HotelMap"
                    className="w-16 sm:w-20 dark:invert"
                />
            </div>
        </div>
    );
};

export default TitleBar;
