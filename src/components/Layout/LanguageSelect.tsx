import { useState, type FunctionComponent } from 'react';
import { Button } from '../ui/button';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '../ui/command';
import { cn } from '@/lib/utils';

const langs = [
    {
        value: 'EN',
        label: 'English',
    },
    {
        value: 'FR',
        label: 'French',
    },
    {
        value: 'DE',
        label: 'German',
    },
    {
        value: 'DU',
        label: 'Dutch',
    },
    {
        value: 'PT',
        label: 'Portugese',
    },
    {
        value: 'ES',
        label: 'Spanish',
    },
];

type LanguageSelectType = {
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};
const LanguageSelect: FunctionComponent<LanguageSelectType> = ({ setOpen }) => {
    const [active, setActive] = useState(false);
    const [value, setValue] = useState('');

    return (
        <>
            <div>
                <Button
                    variant={'outline'}
                    role="combobox"
                    aria-expanded={active}
                    className="w-full justify-start rounded-md"
                    onClick={() => setActive(true)}
                >
                    <div className="grow text-left">
                        {value
                            ? langs.find(lang => lang.value === value)?.label
                            : 'Select language...'}
                    </div>

                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
                <div className={`${active ? 'block' : 'hidden'}`}>
                    <Command className="bg-background dark:bg-muted border mt-1">
                        <CommandInput placeholder="Search languages..." />
                        <CommandList className="bg-background">
                            <CommandEmpty>No language found.</CommandEmpty>
                            <CommandGroup className="p-2 max-h-32 overflow-auto">
                                {langs.map(lang => (
                                    <CommandItem
                                        key={lang.value}
                                        value={`${lang.value}|${lang.label.toLowerCase()}`}
                                        onSelect={currentValue => {
                                            setValue(
                                                currentValue === value
                                                    ? ''
                                                    : lang.value,
                                            );
                                            setActive(false);
                                            setOpen?.(false);
                                        }}
                                    >
                                        <CheckIcon
                                            className={cn(
                                                'mr-2 h-4 w-4',
                                                value === lang.value
                                                    ? 'opacity-100'
                                                    : 'opacity-0',
                                            )}
                                        />
                                        {lang.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </div>
            </div>
        </>
    );
};

export default LanguageSelect;
