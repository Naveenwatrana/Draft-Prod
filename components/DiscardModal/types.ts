export type DiscardModalProps = {
    isOpen: boolean;
    closeModal: () => void;
    cancel: () => void;
    title?: string;
    description?: string;
    buttonLabel?: string;
    skipButtonLabel?: string;
};

export type DividerProps = {
    bgColor?: string;
    marginTop?: number;
    marginBottom?: number;
};
