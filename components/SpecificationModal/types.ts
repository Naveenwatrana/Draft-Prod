export type SpecificationsModalProps = {
    isOpen: boolean;
    closeModal: () => void;
    cancel: () => void;
    title?: string;
    description?: string;
    buttonLabel?: string;
    skipButtonLabel?: string;
};

export type FileSpecificationProps = {
    isOpen: boolean;
    closeModal: () => void;
}
