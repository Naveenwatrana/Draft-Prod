import { Placement } from '@popperjs/core';

export type DatePickerProps = {
    onChange: (date: Date) => void;
    selected: string | null;
    label: string;
    id: string;
    minDate?: string;
    maxDate?: string;
    isDisabled?: boolean;
    placeholder?: string;
    placement?: Placement;
    cypressLocator: string;
}

export type CalenderContainerProps = {
    className?: string;
    children: React.ReactNode;
}
