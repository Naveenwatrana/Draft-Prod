export type ModalProps = {
    isOpen: boolean;
    children: any;
    centered?: boolean;
    position?: number;
    shouldCloseOnOverlayClick?: boolean;
    closeModal?: () => void;
    style?: {
        content?: React.CSSProperties | undefined;
        overlay?: React.CSSProperties | undefined;
    },
};

export type ModalContentContainerProps = {
  width?: number;
};
