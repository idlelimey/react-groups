import { type FunctionComponent } from 'react';
import { Button } from '../ui/button';
import { ArrowLeftRight } from 'lucide-react';
import { useAtom } from 'jotai';
import { placementAtom } from '@/store/atoms';

interface LayoutSwitcherProps {
    variant?: 'ghost' | 'outline' | 'default' | 'link';
    className?: string;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const LayoutSwitcher: FunctionComponent<LayoutSwitcherProps> = ({
    variant = 'ghost',
    className,
    setOpen,
}) => {
    const [placement, setPlacement] = useAtom(placementAtom);

    return (
        <Button
            variant={variant}
            className={className}
            onClick={() => {
                setPlacement(placement === 'right' ? 'left' : 'right');
                setOpen?.(false);
            }}
        >
            <ArrowLeftRight /> Change placement
            <span className="sr-only">Switch placement</span>
        </Button>
    );
};

export default LayoutSwitcher;
