import { useState, type FunctionComponent } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import LayoutSwitcher from './PlacementSwitcher';
import ThemeSwitcher from './ThemeSwitcher';
import { EllipsisVertical } from 'lucide-react';
import LanguageSelect from './LanguageSelect';

//interface SettingsProps {}

const SettingsMenu: FunctionComponent = () => {
    const [open, setOpen] = useState(false);
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="data-[state=open]:text-primary"
                >
                    <EllipsisVertical />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="p-6">
                <div className="flex gap-6 flex-col">
                    <div>
                        <p className="mb-3 font-bold text-muted-foreground text-sm">
                            Language
                        </p>
                        <LanguageSelect setOpen={setOpen} />
                    </div>

                    <div>
                        <p className="mb-3 font-bold text-muted-foreground text-sm">
                            Settings
                        </p>
                        <ThemeSwitcher
                            variant="ghost"
                            className="w-full justify-start"
                            setOpen={setOpen}
                        />
                        <LayoutSwitcher
                            variant="ghost"
                            className="w-full justify-start"
                            setOpen={setOpen}
                        />
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default SettingsMenu;
