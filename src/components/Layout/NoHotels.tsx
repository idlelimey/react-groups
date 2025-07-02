import type { FunctionComponent } from 'react';

const NoHotels: FunctionComponent = () => {
    return (
        <div className="text-center py-8 grow">
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <img
                        src="https://d1hphgblhugsaw.cloudfront.net/assets/svg/morph/no-availability.svg"
                        className="w-2/5 m-auto"
                    />
                </div>
                <div>
                    <h2 className="text-2xl">No Hotels match your search</h2>
                </div>
                <div>
                    <p>Adjust your preferences to get more results.</p>
                </div>
            </div>
        </div>
    );
};

export default NoHotels;
