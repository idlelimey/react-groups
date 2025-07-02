import { Loader2 } from 'lucide-react';
import type { FunctionComponent } from 'react';

const Loading: FunctionComponent = () => {
    return (
        <div className="absolute z-10 h-screen w-full top-0 left-0 bg-zinc-900 flex justify-center">
            <Loader2
                size={64}
                className="stroke-white animate-spin self-center"
            />
        </div>
    );
};

export default Loading;
