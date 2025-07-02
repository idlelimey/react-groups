import { useState, type FunctionComponent } from 'react';
import { Button } from '../ui/button';
import { Sun, Moon, PaletteIcon } from 'lucide-react';
import { useAtom } from 'jotai';
import { themeAtom } from '@/store/atoms';

interface ThemeSwitcherProps {
    variant?: 'ghost' | 'outline' | 'default' | 'link';
    className?: string;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeSwitcher: FunctionComponent<ThemeSwitcherProps> = ({
    variant = 'ghost',
    className,
    setOpen,
}) => {
    const [theme, setTheme] = useAtom(themeAtom);
    const [color, setColor] = useState(true);

    const handleColorChange = () => {
        console.log('color', color);
        if (color)
            document.documentElement.style.setProperty(
                '--primary',
                '#F45B69',
                'important',
            );
        else
            document.documentElement.style.setProperty(
                '--primary',
                '#1ea5e3',
                'important',
            );

        setColor(prev => !prev);
    };

    return (
        <>
            <Button
                variant={variant}
                className={className}
                onClick={() => {
                    setTheme(theme === 'dark' ? 'light' : 'dark');
                    setOpen?.(false);
                }}
            >
                <Sun className="dark:hidden" />
                <Moon className="hidden dark:block" />
                Change theme
            </Button>
            <Button
                variant={variant}
                className={className}
                onClick={() => {
                    handleColorChange();
                    //setOpen?.(false);
                }}
            >
                <PaletteIcon />
                Switch custom colour
            </Button>
        </>
    );
};

export default ThemeSwitcher;
