import { useEffect } from 'react';

export function usePanelWidthObserver(
    ref: React.RefObject<HTMLDivElement>,
    onResize: (width: number) => void,
) {
    useEffect(() => {
        if (!ref.current) return;

        const observer = new ResizeObserver(entries => {
            for (const entry of entries) {
                onResize(entry.contentRect.width);
            }
        });

        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };
    }, [ref, onResize]);
}
